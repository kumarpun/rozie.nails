import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Content from "@/models/Content";
import { defaultContent } from "@/lib/seed";

export async function GET(request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const section = searchParams.get("section");

  if (section) {
    let doc = await Content.findOne({ section });
    if (!doc && defaultContent[section]) {
      doc = await Content.create(defaultContent[section]);
    }
    return NextResponse.json(doc || {});
  }

  // Get all sections
  const sections = Object.keys(defaultContent);
  const docs = await Content.find({});

  // Seed missing sections
  for (const key of sections) {
    if (!docs.find((d) => d.section === key)) {
      const created = await Content.create(defaultContent[key]);
      docs.push(created);
    }
  }

  return NextResponse.json(docs);
}

export async function PUT(request) {
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

  return NextResponse.json(doc);
}
