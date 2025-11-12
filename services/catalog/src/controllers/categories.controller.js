import { z } from "zod";
import { Category } from "../models/Category.js";
import { toSlug } from "../utils/slugs.js";

const CreateCategory = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  icon: z.string().optional(),
});

export async function listCategories(_req, res) {
  const list = await Category.find({}).sort({ title: 1 }).lean();

  return res.json(list);
}

export async function createCategory(req, res, next) {
  try {
    const data = CreateCategory.parse(req.body);
    const slugBase = toSlug(data.title);

    let slug = slugBase;
    for (let i = 1; await Category.exists({ slug }); i++) {
      slug = `${slugBase}-${i}`;
    }

    const doc = await Category.create({ ...data, slug });

    return res.status(201).json({ id: String(doc._id), slug: doc.slug });
  } catch (e) {
    next(e);
  }
}
