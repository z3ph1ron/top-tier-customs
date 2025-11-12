import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  sku: {
    type: String,
  },
  attrs: {
    type: Object,
    default: {},
  },
  priceDelta: {
    type: Number,
    default: 0,
  },
});

const productSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      index: "text",
    },
    description: {
      type: String,
      default: "",
    },
    media: [
      {
        type: String,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    sku: {
      type: String,
      index: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
    tags: [
      {
        type: String,
        index: true,
      },
    ],
    visible: {
      type: Boolean,
      default: true,
    },
    variants: [variantSchema],
    seo: {
      title: String,
      description: String,
    },
  },
  { timestamps: true }
);

productSchema.index({ title: "text", description: "text", tags: 1 });

export const Product = mongoose.model("products", productSchema);
