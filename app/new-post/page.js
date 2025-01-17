import { redirect } from "next/navigation";
import { useActionState } from "react";

import FormSubmit from "@/components/form-submit";
import { storePost } from "@/lib/posts";

export default function NewPostPage() {
  async function createPost(formData) {
    "use server";
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
    if (!image || image.trim().length === 0) {
      errors.push("Image is required");
    }
    if (image && !image.match(/\.(png|jpe?g)$/)) {
      errors.push("Image must be a PNG or JPEG file");
    }

    await storePost({
      imageUrl: "",
      title,
      content,
      userId: 1,
    });

    redirect("/feed");
  }

  const [state, setState] = useActionState(createPost, {});

  return (
    <>
      <h1>Create a new post</h1>
      <form action={createPost}>
        <p className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </p>
        <p className="form-control">
          <label htmlFor="image">Image URL</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
          />
        </p>
        <p className="form-control">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows="5" />
        </p>
        <p className="form-actions">
          <FormSubmit />
        </p>
      </form>
    </>
  );
}
