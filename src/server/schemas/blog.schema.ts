import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const createBlogSchema = z.object({
  userId: z.string(),
  title: z.string().min(3, {
    message: "title must be at least 3 characters.",
  }),
  keywords: z.string().min(3, {
    message: "keywords must be at least 3 characters.",
  }),
  thumbnail: z
    .custom<FileList>()
    .transform((file) => !!file && file.length > 0 && file.item(0))
    .refine(
      (files) => files && files!.size <= MAX_FILE_SIZE,
      "Max size of image is 500kB."
    )
    .refine(
      (files) => files && ACCEPTED_IMAGE_TYPES.includes(files?.type),
      "Only .jpg, .jpeg, .png and webp formats are supported."
    ),
  isPublished: z.string().optional(),
  isPremium: z.string().optional(),
  content: z.string().min(500, {
    message: "content mush be at least 500 chars.",
  }),
});
