import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/mongodb";
import Content from "@/models/Content";
import { defaultContent } from "@/lib/seed";

export async function GET(request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const section = searchParams.get("section");

  if (section) {
    let doc = await Content.findOne({ section }).lean();
    if (!doc && defaultContent[section]) {
      doc = await Content.create(defaultContent[section]);
      doc = JSON.parse(JSON.stringify(doc));
    }
    return NextResponse.json(doc || {});
  }

  const sections = Object.keys(defaultContent);
  const docs = await Content.find({}).lean();
  const result = [...docs];

  const missing = sections.filter((key) => !docs.find((d) => d.section === key));
  if (missing.length > 0) {
    const toCreate = missing.map((key) => defaultContent[key]);
    const created = await Content.insertMany(toCreate);
    result.push(...created);
  }

  return NextResponse.json(JSON.parse(JSON.stringify(result)));
}

export async function PUT(request) {
  const token = request.cookies.get("admin_token")?.value;
  if (token !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  const body = await request.json();
  const { section, ...data } = body;

  if (!section) {
    return NextResponse.json({ error: "Section is required" }, { status: 400 });
  }

  const doc = await Content.findOneAndUpdate(
    { section },
    { section, ...data },
    { upsert: true, new: true, runValidators: true }
  );

  revalidatePath("/");
  revalidatePath("/gallery");

  return NextResponse.json(doc);
}
