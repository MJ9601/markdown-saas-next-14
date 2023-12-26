import { auth } from "@/auth/auth";
import BlogForm from "@/components/Blogs/NewBlog/blogForm/BlogForm";
import React from "react";

export default async function NewBlogPage() {
  const session = await auth();
  const { user } = session!;
  return (
    <div>
      <BlogForm userId={String(user.id ?? "")} />
    </div>
  );
}
