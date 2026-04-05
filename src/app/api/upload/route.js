import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request) {
  const token = request.cookies.get("admin_token")?.value;
  if (token !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = path.extname(file.name);
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  const uploadPath = path.join(process.cwd(), "public", "uploads", filename);

  await writeFile(uploadPath, buffer);

  return NextResponse.json({ url: `/uploads/${filename}` });
}
