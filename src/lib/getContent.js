import dbConnect from "./mongodb";
import Content from "@/models/Content";
import { defaultContent } from "./seed";

export async function getContent(section) {
  await dbConnect();
  let doc = await Content.findOne({ section }).lean();
  if (!doc && defaultContent[section]) {
    doc = await Content.create(defaultContent[section]);
    doc = JSON.parse(JSON.stringify(doc));
  }
  return doc ? JSON.parse(JSON.stringify(doc)) : null;
}

export async function getAllContent() {
  await dbConnect();
  const sections = Object.keys(defaultContent);
  const docs = await Content.find({}).lean();

  const result = {};
  for (const key of sections) {
    const existing = docs.find((d) => d.section === key);
    if (existing) {
      result[key] = JSON.parse(JSON.stringify(existing));
    } else {
      const created = await Content.create(defaultContent[key]);
      result[key] = JSON.parse(JSON.stringify(created));
    }
  }
  return result;
}
