import mongoose from "mongoose";
import config from "@/config";

const { dbName, dbPass, dbUser, dbHost } = config;

export default async function connectTodb() {
  try {
    await mongoose.connect(
      `mongodb://${dbUser}:${dbPass}@${dbHost}:27017/${dbName}?authSource=admin`,
      {
        // @ts-ignore
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("connected to db!!");
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
}
