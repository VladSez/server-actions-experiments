"use client";

import { deletePostZSA } from "@/app/_actions/zsa/delete-post";
import { Button } from "@/components/ui/button";
import { useServerAction } from "zsa-react";

export const DeletePostButton = ({
  id,
  isOptimisticUpdate,
}: {
  id: string;
  isOptimisticUpdate: boolean;
}) => {
  const { isPending, execute: executeDeletePost } = useServerAction(
    deletePostZSA,
    {
      onError: ({ err }) => {
        console.error("Server action error:", err);
        alert(`Err: ${err.message}`);
      },
      onSuccess: ({ data }) => {
        console.log("Server action success:", data);
      },
    }
  );

  return (
    <Button
      type="submit"
      _size={"sm"}
      onClick={async () => {
        await executeDeletePost({ id });
      }}
      disabled={isPending || isOptimisticUpdate}
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
};
