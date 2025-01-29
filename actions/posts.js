"use server";

import { redirect } from "next/navigation";

import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { UploadStream } from "cloudinary";
import { uploadImage } from "@/lib/cloundinary";
import { revalidatePath } from "next/cache";

export default async function createPost(prevState, formData) {
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");

  let errors = [];
  if (!title || title.trim().length === 0) {
    errors.push("Title is required");
  }
  if (!content || content.trim().length === 0) {
    errors.push("Content is required");
  }
  if (!image || image.size === 0) {
    errors.push("Image is required");
  }

  if (errors.length > 0) {
    return { errors };
  }

  /*
  let imageUrl = "";
  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error("Image upload failed");
  }
  */

  await storePost({
    imageUrl: "",
    title,
    content,
    userId: 1,
  });

  redirect("/feed");
}

export async function toggleLikePosts(postId) {
  updatePostLikeStatus(postId, 2);
  revalidatePath("/feed");
}
