import { useCallback, useEffect } from "react";
import PostForm from "../components/postFormComponents/PostForm.tsx";
import { usePostForm } from "../hooks/usePostForm.tsx";

export default function NewPost() {
  // Use our custom hook for form handling
  const { handleSubmit, handleCancel, isSubmitting, renderError, cleanUp } =
    usePostForm();

  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  const renderHeader = useCallback(() => {
    return (
      <h1 className="text-3xl font-bold text-blue-900 dark:text-white mb-8">
        Create New Post
      </h1>
    );
  }, []);

  const renderForm = useCallback(() => {
    return (
      <PostForm
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        isSubmitting={isSubmitting}
      />
    );
  }, [handleSubmit, handleCancel, isSubmitting]);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {renderHeader()}
      {renderError()}
      {renderForm()}
    </div>
  );
}
