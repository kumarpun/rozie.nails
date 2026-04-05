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
  const missing = [];

  for (const key of sections) {
    const existing = docs.find((d) => d.section === key);
    if (existing) {
      result[key] = JSON.parse(JSON.stringify(existing));
    } else {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    const toCreate = missing.map((key) => defaultContent[key]);
    const created = await Content.insertMany(toCreate);
    for (const doc of created) {
      const plain = JSON.parse(JSON.stringify(doc));
      result[plain.section] = plain;
    }
  }

  return result;
}
