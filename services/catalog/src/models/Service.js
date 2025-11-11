import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
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
    basePrice: {
      type: Number,
      required: true,
    },
    durationMinutes: {
      type: Number,
      required: true,
    },
    requiresDeposit: {
      type: Boolean,
      default: false,
    },
    depositAmount: {
      type: Number,
      default: 0,
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
    seo: {
      title: String,
      description: String,
    },
  },
  { timestamps: true }
);

serviceSchema.index({ title: "text", description: "text", tags: 1 });

export const Service = mongoose.model("services", serviceSchema);
