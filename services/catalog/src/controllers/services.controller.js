import { z } from "zod";
import { Service } from "../models/Service.js";
import { toSlug } from "../utils/slugs.js";
import { parsePagination } from "../utils/paginate.js";

const CreateService = z.object({
  title: z.string().min(2),
  description: z.string().optional().default(""),
  media: z.array(z.string().url()).optional().default([]),
  basePrice: z.number().int().nonnegative(),
  durationMinutes: z.number().int().positive(),
  requiresDeposit: z.boolean().optional().default(false),
  depositAmount: z.number().int().optional().default(0),
  categoryID: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  visible: z.boolean().optional().default(true),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
    })
    .optional()
    .default({}),
});

export async function listServices(req, res) {
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
    filter.basePrice = { ...(filter.basePrice || {}), $gte: Number(minPrice) };
  }
  if (maxPrice) {
    filter.basePrice = { ...(filter.basePrice || {}), $lte: Number(maxPrice) };
  }

  const sortMap = {
    new: { createdAt: -1 },
    price_asc: { basePrice: 1 },
    price_desc: { basePrice: -1 },
  };

  const [items, total] = await Promise.all([
    Service.find(filter)
      .toSorted(sortMap[sort] || sortMap.new)
      .skip(skip)
      .limit(limit)
      .lean(),
    Service.countDocuments(filter),
  ]);

  return res.json({ items, page, limit, total });
}

export async function getServiceBySlug(req, res) {
  const doc = await Service.findOne({
    slug: req.params.slug,
    visible: true,
  }).lean();
  if (!doc) {
    return res.status(404).json({ error: "not_found" });
  }

  return res.json(doc);
}

export async function createService(req, res, next) {
  try {
    const data = CreateService.parse(req.body);
    const slugBase = toSlug(data.title);

    let slug = slugBase;
    for (let i = 1; await Service.exists({ slug }); i++) {
      slug = `${slugBase}-${i}`;
    }

    const doc = await Service.create({ ...data, slug });

    return res.status(201).json({ id: String(doc._id), slug: doc.slug });
  } catch (e) {
    next(e);
  }
}

export async function updateService(req, res, next) {
  try {
    const updates = CreateService.partial().parse(req.body);
    const doc = await Service.findByIdAndUpdate(req.params.id, updates, {
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

export async function deleteService(req, res) {
  await Service.findByIdAndDelete(req.params.id);

  return res.status(204).end();
}
