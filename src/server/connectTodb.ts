import mongoose from "mongoose";
import config from "@/config";

const { dbName, dbPass, dbUser, dbHost } = config;

let isConnected: any = null;

export default async function connectTodb() {
  try {
    if (isConnected) return;
    const db = await mongoose.connect(
      `mongodb://${dbUser}:${dbPass}@${dbHost}:27017/${dbName}?authSource=admin`
    );
    isConnected = db.connections[0].readyState;
    console.log("connected to db!!");
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
}
