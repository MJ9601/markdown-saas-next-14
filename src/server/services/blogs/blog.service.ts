import { Blog } from "@/server/models/blog.model";
import { ICreateNewBlog, IDelBlog, IEditBlog } from ".";
import connectTodb from "@/server/connectTodb";

export const createNewBlog = async ({ creator, payload }: ICreateNewBlog) => {
  const { thumbnail, keywords: _keywords, content, title, ...rest } = payload;
  let urlParam = title.split(" ").join("-");
  const keywords = _keywords.split(", ");

  try {
    const blog = await getBlogByUrlParam(urlParam);
    if (blog) {
      urlParam = urlParam.concat("-", keywords[0]);
    }

    const newBlog = await Blog.create({
      urlParam,
      title,
      keywords,
      thumbnail,
      creator,
      content,
      rest,
    });

    const savedBlog = await newBlog.save();

    return savedBlog;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};

export const editBlog = async ({ creator, payload }: IEditBlog) => {};

export const delBlog = async ({ blogId, creator }: IDelBlog) => {};

export const getAllBlogs = async () => {};

export const getBlogByUrlParam = async (urlParam: string) => {
  await connectTodb();
  const blog = await Blog.findOne({ urlParam });
  return blog ?? false;
};

export const getBlogById = async (id: string) => {};
