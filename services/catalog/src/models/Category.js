import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    icon: String,
  },
  { timestamps: true }
);

export const Category = mongoose.model("categories", categorySchema);
