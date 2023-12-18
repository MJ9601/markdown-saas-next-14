"use client";
import { Input, Label, Switch, Textarea } from "@/components/general";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/general/form";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdSave } from "react-icons/md";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MarkdownPreview from "@/components/markdown/Markdown";
import { toast } from "@/components/general/use-toast";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const FormSchema = z.object({
  title: z.string().min(3, {
    message: "title must be at least 3 characters.",
  }),
  keywords: z.string().min(3, {
    message: "keywords must be at least 3 characters.",
  }),
  thumbnail: z.any(),
  // .refine(
  //   (files: File[]) => files?.[0].size <= MAX_FILE_SIZE,
  //   "Max size of image is 500kB."
  // )
  // .refine(
  //   (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0].type),
  //   "Only .jpg, .jpeg, .png and webp formats are supported."
  // )
  isPublished: z.boolean().default(true),
  isPremium: z.boolean().default(false),
  content: z.string().min(500, {
    message: "content mush be at least 500 chars.",
  }),
});

export default function BlogForm() {
  const [image, setImage] = useState<File | undefined>();
  const [preview, setPreview] = useState<any>("");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: "",
      title: "",
      keywords: "",
      isPremium: false,
      isPublished: true,
    },
  });

  const setBlogPreviewInfo = (name: string, value: string | File) =>
    setPreview((prev: any) => ({ ...prev, [name]: value }));

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="ring-1 ring-secondary/70 rounded-md py-4 px-5 max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-3">
      <div className="flex-1">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col flex-1"
          >
            <div className="ring-1 my-3 rounded-md flex justify-between">
              <div className="flex gap-2">
                <div className="flex w-fit justify-center items-center gap-5 py-3 px-3 bg-secondary/40">
                  Premium
                  <FormField
                    control={form.control}
                    name="isPremium"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex w-fit justify-center items-center gap-5 py-3 px-3 bg-secondary/40">
                  Published
                  <FormField
                    control={form.control}
                    name="isPublished"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
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
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Tilte</Label>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="title..."
                            onChange={(e) => {
                              field.onChange(e);
                              setBlogPreviewInfo("title", e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormDescription>Title of the blog</FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="my-2">
                  <FormField
                    control={form.control}
                    name="keywords"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Keywords</Label>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Separate them with ', '"
                            onChange={(e) => {
                              field.onChange(e);
                              setBlogPreviewInfo("keywords", e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          Separate keywords with ", "
                        </FormDescription>
                      </FormItem>
                    )}
                  />
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
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          id="imageInput"
                          hidden
                          {...field}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            setImage(e.currentTarget?.files![0]);
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormDescription>Browse an image</FormDescription>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="my-2 flex mr-3 gap-2 flex-col md:flex-row ">
                  <div className="flex-1">
                    <Label>Content</Label>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="min-h-[300px]  resize "
                        placeholder="description ...."
                        onChange={(e) => {
                          field.onChange(e);
                          setBlogPreviewInfo("content", e.currentTarget.value);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Write about subject at least 500 chars.
                    </FormDescription>
                  </div>
                  {/* <div className="flex-1">
                  <Label>j</Label>
                  <Textarea
                    disabled
                    className="min-h-[300px] max-h-fit"
                    value={form.getValues().content}
                  />
                  <MarkdownPreview content={form.getValues().content} />
                </div> */}
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      {preview && (
        <>
          <div className="border border-l-2"></div>
          <div className="flex-1 w-full lg:max-w-[500px] xl:max-w-[600px]">
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
                  <MarkdownPreview content={preview?.content} />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
