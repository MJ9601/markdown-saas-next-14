"use server";

import { createBlogSchema } from "../schemas/blog.schema";
import { ICreateNewBlog } from "../services/blogs";
import { uploadImageFunc } from "../services/upload/upload.service";

export const handleCreateBlogInFormAction = async (
  prevState: unknown,
  formData: FormData
) => {
  const validateFields = createBlogSchema.safeParse(
    Object.fromEntries(formData)
  );
  // console.log(Object.fromEntries(formData));
  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
    };
  }
  const { thumbnail: imgFile } = validateFields.data;

  const thumbnail = await uploadImageFunc(imgFile as File);

  console.log(thumbnail);
};

export const handleCreateNewBlog = async ({
  creator,
  payload,
}: ICreateNewBlog) => {
  const { thumbnail } = payload;
  const uploadImage = uploadImageFunc(thumbnail);
};
export const handleUpdateBlog = async () => {};

export const handleDeleteBlog = async () => {};
