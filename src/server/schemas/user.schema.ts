import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: false,
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
  authProvider: {
    type: [String],
    required: true,
  },
  providerIds: {
    type: [String],
  },
  access: {
    type: String,
    enum: ["normal", "admin", "premium"],
    default: "normal",
  },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
