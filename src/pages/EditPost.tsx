import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import Loading from "../UI/Loading.tsx";
import PostForm from "../components/postFormComponents/PostForm/PostForm.tsx";
import { getPostById } from "../utils/fetch.ts";
import { usePostForm } from "../hooks/usePostForm.tsx";

export default function EditPost() {
  const { postId } = useParams();

  const {
    data: post,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId as string),
  });

  // Use our custom hook for form handling with edit mode
  const { handleSubmit, handleCancel, isSubmitting, renderError, cleanUp } =
    usePostForm({
      postId,
      post,
      isEdit: true,
    });

  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  if (isPending) return <Loading text="Loading post..." />;
  if (isError)
    return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-blue-900 dark:text-white mb-8">
        Edit Post
      </h1>
      {renderError()}
      <PostForm
        post={post || {}}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
