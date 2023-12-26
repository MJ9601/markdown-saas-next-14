import { ICreateNewBlog, IDelBlog, IEditBlog } from ".";


export const createNewBlog = async ({ creator, payload }: ICreateNewBlog) => {
  console.log(payload);
  const { thumbnail, keywords, title, ...rest } = payload;
  const urlParam = title.split(" ").join("-");
  try {
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};

export const editBlog = async ({ creator, payload }: IEditBlog) => {};

export const delBlog = async ({ blogId, creator }: IDelBlog) => {};

export const getAllBlogs = async () => {};

export const getBlogByUrlParam = async (urlParam: string) => {};

export const getBlogById = async (id: string) => {};
