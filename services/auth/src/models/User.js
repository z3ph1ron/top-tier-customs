import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      index: true,
    },
    passwordHash: {
      type: String,
    },
    roles: {
      type: [String],
      default: ["CUSTOMER"],
    },
    profile: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      avatar: {
        type: String,
      },
      phone: {
        type: String,
      },
      birthday: {
        type: Date,
      },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("users", userSchema);
