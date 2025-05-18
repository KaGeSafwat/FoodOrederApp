import { useState, useCallback, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { newPostActions } from "../store/slices/newPostSlice";
import { useAppMutations } from "./useAppMutation";
import type { Post, PostInput, PostUpdateInput } from "../utils/fetch";

interface UsePostFormProps {
  postId?: string;
  post?: Post | null;
  isEdit?: boolean;
}

export const usePostForm = ({
  postId,
  post,
  isEdit = false,
}: UsePostFormProps = {}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { createPost, updatePost, isLoading } = useAppMutations();
  const { imagePreview, error: storeError } = useAppSelector(
    (state) => state.newPost
  );
  const [formError, setFormError] = useState<string | null>(null);

  // Clear form error
  const clearError = useCallback(() => {
    setFormError(null);
    dispatch(newPostActions.setError(null));
  }, [dispatch]);

  // Validate form
  const validateForm = useCallback(() => {
    if (!imagePreview) {
      const errorMessage = `Error: Image is required. Please add an image before ${
        isEdit ? "updating" : "creating"
      } the post.`;

      if (isEdit) {
        dispatch(newPostActions.setError(errorMessage));
      } else {
        setFormError(errorMessage);
      }

      return false;
    }
    return true;
  }, [imagePreview, isEdit, dispatch]);

  // Create post data from form
  const createPostData = useCallback(
    (formData: FormData): PostInput => ({
      title: String(formData.get("title")) || "Untitled Post",
      content: String(formData.get("content")) || "",
      image: imagePreview || undefined,
      createdAt: new Date().toISOString(),
    }),
    [imagePreview]
  );

  // Create update post data from form
  const createUpdatePostData = useCallback(
    (formData: FormData): PostUpdateInput => {
      if (!postId) throw new Error("Post ID is required for updating a post");

      return {
        id: postId,
        title: String(formData.get("title")) || "Untitled Post",
        content: String(formData.get("content")) || "",
        image: imagePreview || post?.image || "",
        createdAt: post?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    },
    [postId, post, imagePreview]
  );

  // Handle form submission
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      clearError();

      if (!validateForm()) return;

      const formData = new FormData(e.currentTarget);

      if (isEdit && postId) {
        const postData = createUpdatePostData(formData);
        updatePost(postData);
      } else {
        const postData = createPostData(formData);
        createPost(postData);
      }
    },
    [
      clearError,
      validateForm,
      isEdit,
      postId,
      createUpdatePostData,
      createPostData,
      updatePost,
      createPost,
    ]
  );

  // Handle cancel button
  const handleCancel = useCallback(() => {
    navigate("/dashboard/posts");
  }, [navigate]);

  // Clean up function to clear image state when component unmounts
  const cleanUp = useCallback(() => {
    dispatch(newPostActions.setImagePreview(null));
    dispatch(newPostActions.setIsImageUrl(false));
    dispatch(newPostActions.setImageUrl(""));
  }, [dispatch]);

  // Render error message
  const renderError = useCallback(() => {
    const error = isEdit ? storeError : formError;
    if (!error) return null;

    return (
      <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        {error}
      </div>
    );
  }, [isEdit, storeError, formError]);

  return {
    handleSubmit,
    handleCancel,
    isSubmitting: isLoading,
    renderError,
    cleanUp,
    error: isEdit ? storeError : formError,
  };
};
