import { useNavigate } from 'react-router-dom';
import { type FormEvent, useState } from 'react';
import { newPostActions } from '../store/slices/newPostSlice.ts';
import { createPost, queryClient } from '../utils/fetch.ts';
import { useMutation } from '@tanstack/react-query';
import PostForm from '../components/postFormComponents/FormPost.tsx';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import type { PostsData, PostInput } from '../utils/fetch.ts';

export default function NewPost() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { imagePreview } = useAppSelector((state) => state.newPost);
  const [formError, setFormError] = useState<string | null>(null);

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onMutate: async (newPost) => {
      // Cancel any outgoing refetches to avoid overwriting our optimistic update
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      const previousPosts = queryClient.getQueryData<PostsData>(['posts']);

      // Create an optimistic post with a temporary ID
      const optimisticPost = {
        ...newPost,
        id: 'temp-id-' + Date.now(),
      };

      // Add optimistic post to the posts list
      queryClient.setQueryData<PostsData>(['posts'], (old) => {
        if (!old) {
          return {
            posts: [optimisticPost],
            totalPosts: 1,
            totalPages: 1,
            currentPage: 1,
          };
        }

        return {
          ...old,
          posts: [optimisticPost, ...old.posts],
          totalPosts: old.totalPosts + 1,
          totalPages: Math.ceil((old.totalPosts + 1) / 4),
        };
      });

      return { previousPosts };
    },
    onError: (err, _, context) => {
      // Revert to previous state if mutation fails
      queryClient.setQueryData(['posts'], context?.previousPosts);
      setFormError(`Error creating post: ${err.message}`);

      // Show error toast
      toast.error(`Failed to create post: ${err.message}`, {
        position: 'top-right',
        autoClose: 3000,
      });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] });

      // Clear image preview
      dispatch(newPostActions.setImagePreview(null));
      dispatch(newPostActions.setIsImageUrl(false));

      // Show success toast
      toast.success('Post created successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });

      // Navigate to posts page
      navigate('/dashboard/posts');
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    // Validate image
    if (!imagePreview) {
      setFormError(
        'Error: Image is required. Please add an image before creating the post.'
      );
      return;
    }

    // Get form data and create post
    const formData = new FormData(e.currentTarget);
    const postData: PostInput = {
      title: String(formData.get('title')) || 'Untitled Post',
      content: String(formData.get('content')) || '',
      image: imagePreview,
      createdAt: new Date().toISOString(),
    };

    // The navigation will happen in the onSuccess callback
    createPostMutation.mutate(postData);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-blue-900 dark:text-white mb-8">
        Create New Post
      </h1>

      {formError && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {formError}
        </div>
      )}

      <PostForm
        handleSubmit={handleSubmit}
        isSubmitting={createPostMutation.isPending}
      />
    </div>
  );
}
