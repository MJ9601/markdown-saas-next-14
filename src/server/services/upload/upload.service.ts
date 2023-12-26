"use server";
import config from "@/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: config.cloudName,
  api_key: config.cloudApiKey,
  api_secret: config.cloudApiSecret,
});

export const uploadImageFunc = async (file: File) => {
  try {
    // console.log(file);
    const arrayButter = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayButter);
    const uploadingResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            tag: ["markdown-saas-next-14"],
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }

            resolve(result);
          }
        )
        .end(buffer);
    });
    return uploadingResult;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};
