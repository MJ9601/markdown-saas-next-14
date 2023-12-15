import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      min: 3,
      max: 25,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 25,
    },
    image: {
      type: String,
    },
    password: {
      type: String,
    },
    googleAuthId: {
      type: String,
    },
    githubAuthId: {
      type: String,
    },
    access: {
      type: String,
      enum: ["normal", "admin", "premium"],
      default: "normal",
    },
  },
  { timestamps: true }
);

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
