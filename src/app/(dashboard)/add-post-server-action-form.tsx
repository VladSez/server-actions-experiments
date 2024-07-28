"use client";

import { useRef } from "react";
import { addPost } from "../_actions/add-post";

export const AddPostServerActionForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="border-2 my-5 p-4">
      <p>Add post:</p>
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget);
          const formValues = Object.fromEntries(formData.entries());

          const title = formValues?.title as string;
          const content = formValues?.content as string;

          console.log("form values", { title, content });

          try {
            // server action
            addPost(title, content);

            // Clear the form
            formRef?.current?.reset();
          } catch (e) {
            console.log("Error in client");
            console.error(e);
          }
        }}
      >
        Title: <input type="text" name="title" className="border" required />
        Content:{" "}
        <input type="text" name="content" className="border" required />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};
