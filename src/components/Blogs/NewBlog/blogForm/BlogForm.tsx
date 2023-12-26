"use client";
import { Input, Label, Switch } from "@/components/general";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/general/form";
import Image from "next/image";
import React, { useState } from "react";
import { MdSave } from "react-icons/md";
import MarkdownPreview from "@/components/markdown/Markdown";
import Editor from "@/components/editor/Editor";
import { handleCreateBlogInFormAction } from "@/server/controllers";
import { useFormState } from "react-dom";
import InputDesc from "@/components/general/input.desc";

export default function BlogForm() {
  const [image, setImage] = useState<File | undefined>();
  const [preview, setPreview] = useState<any>("");
  const [state, formAction] = useFormState(
    handleCreateBlogInFormAction,
    undefined
  );
  // const form = useForm<z.infer<typeof FormSchema>>({
  //   resolver: zodResolver(FormSchema),
  //   defaultValues: {
  //     content: "",
  //     title: "",
  //     keywords: "",
  //     isPremium: false,
  //     isPublished: true,
  //   },
  // });

  // useEffect(() => {
  //   form.setValue("content", preview?.content);
  // }, [preview?.content]);

  const setBlogPreviewInfo = (name: string, value: string | File) =>
    setPreview((prev: any) => ({ ...prev, [name]: value }));

  // async function onSubmit(data: z.infer<typeof FormSchema>) {
  //   console.log(data);
  //   const { content, isPremium, isPublished, keywords, title } = data;

  // toast({
  //   title: "You submitted the following values:",
  //   description: (
  //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
  //     </pre>
  //   ),
  // });

  // const thumbnailFile = fileRef?.current?.files[0];
  // const thumbnail = await uploadImageFunc(thumbnailFile);

  // await handleCreateNewBlog({
  //   creator: "ddd",
  //   payload: {
  //     content,
  //     isPremium,
  //     isPublished,
  //     keywords,
  //     thumbnail,
  //     title,
  //   },
  // });
  // }

  return (
    <div className="ring-1 ring-secondary/70 rounded-md py-4 px-5 max-w-[1250px] mx-auto flex flex-col lg:flex-row gap-3">
      <div className="flex-1">
        <form
          action={formAction}
          className="w-full flex flex-col flex-1"
        >
          <input type="hidden" name="userId" />
          <div className="ring-1 my-3 rounded-md flex justify-between">
            <div className="flex gap-2">
              <div className="flex w-fit justify-center items-center gap-5 py-3 px-3 bg-secondary/40">
                Premium
                <Switch
                  name="isPremium"
                  // checked={false}
                  // onCheckedChange={field.onChange}
                />
              </div>
              <div className="flex w-fit justify-center items-center gap-5 py-3 px-3 bg-secondary/40">
                Published
                <Switch
                  name="isPublished"
                  // checked={true}
                  // onCheckedChange={field.onChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="rounded-none flex w-fit justify-center items-center gap-5 py-3 px-3 bg-secondary/40 hover:bg-secondary/90 transition-all duration-500 ease-linear"
            >
              Save
              <MdSave />
            </button>
          </div>
          <div className="flex flex-wrap">
            <div className="flex-[3]">
              <div className="my-2">
                <Label>Tilte</Label>
                <Input
                  name="title"
                  placeholder="title..."
                  onChange={(e) => {
                    setBlogPreviewInfo("title", e.target.value);
                  }}
                />
                <InputDesc>Title of the blog</InputDesc>
              </div>
              <div className="my-2">
                <Label>Keywords</Label>
                <Input
                  name="keywords"
                  placeholder="Separate them with ', '"
                  onChange={(e) => {
                    setBlogPreviewInfo("keywords", e.target.value);
                  }}
                />
                <InputDesc>Separate keywords with ", "</InputDesc>
              </div>
            </div>
            <div className="flex-1 min-h-full mt-2 mb-3 mx-3 ">
              <Label>Thumbnail</Label>
              <div className=" relative min-h-full rounded-md ring-1 ring-secondary flex items-center justify-center overflow-hidden">
                <label htmlFor="imageInput">
                  <p className="ring-1 ring-secondary py-2 px-4 rounded-md cursor-pointer !z-20 text-primary">
                    Browse
                  </p>
                </label>
                {image && (
                  <Image
                    src={URL.createObjectURL(image)}
                    width={40}
                    height={40}
                    className="absolute left-0 top-0 w-full h-full -z-10"
                    alt="image"
                  />
                )}
              </div>
              <input
                id="imageInput"
                name="thumbnail"
                hidden
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setImage(e.currentTarget?.files![0]);
                }}
              />
              <InputDesc>Browse an image</InputDesc>
            </div>
          </div>
          <div className="my-2 flex mr-3 gap-2 flex-col md:flex-row ">
            <div className="flex-1">
              <Label>Content</Label>
              <Editor fieldName="content" onChange={setBlogPreviewInfo} />
              <InputDesc>Write about subject at least 500 chars.</InputDesc>
            </div>
          </div>
        </form>
      </div>
      {preview && (
        <>
          <div className="border border-l-2"></div>
          <div className="flex-1 w-full lg:max-w-[500px] xl:max-w-[580px]">
            <Label>Preview</Label>
            <div className="ring-1 ring-secondary/80 rounded-md px-3 py-5 min-h-[95%]">
              {preview?.title && (
                <h1 className="text-3xl  w-full capitalize">{preview.title}</h1>
              )}
              {preview?.keywords && (
                <div className="pt-2">
                  Keywords:
                  <span className="italic">{preview.keywords}</span>
                </div>
              )}

              {image && (
                <div className="py-2">
                  <Image
                    width={100}
                    height={100}
                    src={URL.createObjectURL(image)}
                    alt="image"
                    className="w-full object-contain rounded-sm my-2 "
                  />
                </div>
              )}
              {preview?.content && (
                <div className="">
                  <MarkdownPreview content={preview.content} />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
