import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      min: 3,
      max: 25,
    },
    urlParam: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 25,
    },
    thumbnail: {
      type: String,
    },
    keywords: {
      type: [String],
      required: true,
    },
    content: {
      type: String,
      required: true,
      min: 50,
      max: 20000,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Blog = mongoose.models?.Blog || mongoose.model("Blog", blogSchema);
