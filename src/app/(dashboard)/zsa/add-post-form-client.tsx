"use client";

import { addPostZSA } from "@/app/_actions/zsa/add-post";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useServerAction } from "zsa-react";

export const AddPostFormZSA = ({
  addOptimisticPost,
}: {
  addOptimisticPost: (action: { title: string; content: string }) => void;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const { isPending, execute: executeAddPost } = useServerAction(addPostZSA, {
    onError: ({ err }) => {
      console.error("Server action error:", err);
      alert(`Err: ${err.message}`);
    },
    onSuccess: ({ data }) => {
      console.log("Server action success:", data);

      // Clear the form
      formRef?.current?.reset();

      // // focus on the title input
      titleInputRef?.current?.focus();
    },
  });

  return (
    <div className="border-2 my-5 p-4">
      <p className="font-semibold text-lg">Add post form</p>
      <form
        ref={formRef}
        onSubmit={async (e) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget);
          const formValues = Object.fromEntries(formData.entries());

          const title = formValues?.title as string;
          const content = formValues?.content as string;

          console.log("form values", { title, content });

          // Optimistic update
          addOptimisticPost({ content, title });

          await executeAddPost({ title, content });
        }}
      >
        <div>
          Title:{" "}
          <input
            type="text"
            name="title"
            className="border"
            required
            autoFocus
            ref={titleInputRef}
          />
        </div>
        <div>
          Content:{" "}
          <input type="text" name="content" className="border" required />
        </div>
        <Button type="submit" _size={"sm"} disabled={isPending}>
          {isPending ? "Loading..." : "Save"}
        </Button>
      </form>
    </div>
  );
};
