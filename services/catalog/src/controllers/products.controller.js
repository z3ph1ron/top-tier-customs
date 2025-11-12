import { z } from "zod";
import { Product } from "../models/Product.js";
import { toSlug } from "../utils/slugs.js";
import { parsePagination } from "../utils/paginate.js";

const CreateProduct = z.object({
  title: z.string().min(2),
  description: z.string().optional().default(""),
  media: z.array(z.string().url()).optional().default([]),
  price: z.number().int().nonnegative(),
  sku: z.string().optional(),
  categoryID: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  visible: z.boolean().optional().default(true),
  variants: z
    .array(
      z.object({
        sku: z.string().optional(),
        attrs: z.record(z.any()).optional(),
        priceDelta: z.number().int().optional().default(0),
      })
    )
    .optional()
    .default([]),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
    })
    .optional()
    .default({}),
});

export async function listProducts(req, res) {
  const { page, limit, skip } = parsePagination(req.query);
  const { q, tag, minPrice, maxPrice, sort = "new" } = req.query;

  const filter = { visible: true };
  if (q) {
    filter.$text = { $search: String(q) };
  }
  if (tag) {
    filter.tags = String(tag);
  }
  if (minPrice) {
    filter.price = { ...(filter.price || {}), $gte: Number(minPrice) };
  }
  if (maxPrice) {
    filter.price = { ...(filter.price || {}), $lte: Number(maxPrice) };
  }

  const sortMap = {
    new: { createdAt: -1 },
    price_asc: { price: 1 },
    price_desc: { price: -1 },
  };

  const [items, total] = await Promise.all([
    Product.find(filter)
      .sort(sortMap[sort] || sortMap.new)
      .skip(skip)
      .limit(limit)
      .lean(),
    Product.countDocuments(filter),
  ]);

  return res.json({ items, page, limit, total });
}

export async function getProductBySlug(req, res) {
  const doc = await Product.findOne({
    slug: req.params.slug,
    visible: true,
  }).lean();

  if (!doc) {
    return res.status(404).json({ error: "not_found" });
  }

  return res.json(doc);
}

export async function createProduct(req, res, next) {
  try {
    const data = CreateProduct.parse(req.body);
    const slugBase = toSlug(data.title);

    let slug = slugBase;
    for (let i = 1; await Product.exists({ slug }); i++) {
      slug = `${slugBase}-${i}`;
    }

    const doc = await Product.create({ ...data, slug });

    return res.status(201).json({ id: String(doc._id), slug: doc.slug });
  } catch (e) {
    next(e);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const updates = CreateProduct.partial().parse(req.body);
    const doc = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    }).lean();
    if (!doc) {
      return res.status(404).json({ error: "not_found" });
    }

    return res.json(doc);
  } catch (e) {
    next(e);
  }
}

export async function deleteProduct(req, res) {
  await Product.findByIdAndDelete(req.params.id);

  return res.status(204).end();
}
