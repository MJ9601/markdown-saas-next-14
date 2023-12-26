"use server";

import { createBlogSchema } from "../schemas/blog.schema";
import { createNewBlog } from "../services/blogs";
import { uploadImageFunc } from "../services/upload/upload.service";

export const handleCreateBlogInFormAction = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    const validateFields = createBlogSchema.safeParse(
      Object.fromEntries(formData)
    );
    // console.log(Object.fromEntries(formData));
    if (!validateFields.success) {
      return {
        errors: validateFields.error.flatten().fieldErrors,
      };
    }
    const {
      thumbnail: imgFile,
      content,
      keywords,
      title,
      userId,
      isPremium,
      isPublished,
    } = validateFields.data;

    const uploadedResp = await uploadImageFunc(imgFile as File);
    const { secure_url: thumbnail } = uploadedResp as any;

    const newBlog = await createNewBlog({
      creator: userId,
      payload: {
        content,
        keywords,
        thumbnail,
        title,
        isPremium: !!isPremium,
        isPublished: !!isPublished,
      },
    });

    return newBlog;
  } catch (error: any) {
    console.error(error.message);
    return { errors: [error.message] };
  }
};

export const handleUpdateBlog = async () => {};

export const handleDeleteBlog = async () => {};
