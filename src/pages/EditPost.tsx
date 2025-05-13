import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import Loading from '../components/Loading.tsx';
import PostForm from '../components/postFormComponents/FormPost.tsx';
import { getPostById, queryClient, updatePost } from '../utils/fetch.ts';
import { newPostActions } from '../store/slices/newPostSlice.ts';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import type { Post, PostUpdateInput, PostsData } from '../utils/fetch.ts';
import { type FormEvent } from 'react';

export default function EditPost() {
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { imagePreview, error: formError } = useAppSelector(
    (state) => state.newPost
  );

  // Fetch post data
  const {
    data: post,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId as string),
  });

  // Update post mutation with optimistic updates
  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onMutate: async (updatedPost) => {
      // Cancel any outgoing refetches to avoid overwriting our optimistic update
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      await queryClient.cancelQueries({ queryKey: ['post', postId] });

      // Save current state
      const previousPosts = queryClient.getQueryData<PostsData>(['posts']);
      const previousPost = queryClient.getQueryData<Post>(['post', postId]);

      // Optimistically update the single post view
      queryClient.setQueryData<Post>(['post', postId], updatedPost);

      // Optimistically update the posts list
      queryClient.setQueryData<PostsData>(['posts'], (old) => {
        if (!old) return old;

        return {
          ...old,
          posts: old.posts.map((post) =>
            post.id === updatedPost.id ? { ...post, ...updatedPost } : post
          ),
        };
      });

      return { previousPosts, previousPost };
    },
    onError: (err, _, context) => {
      // Revert to previous state if mutation fails
      if (context?.previousPost) {
        queryClient.setQueryData(['post', postId], context.previousPost);
      }
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts);
      }
      dispatch(newPostActions.setError(`Error updating post: ${err.message}`));

      // Show error toast
      toast.error(`Failed to update post: ${err.message}`, {
        position: 'top-right',
        autoClose: 3000,
      });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });

      // Clear image preview
      dispatch(newPostActions.setImagePreview(null));
      dispatch(newPostActions.setIsImageUrl(false));

      // Show success toast
      toast.success('Post updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });

      // Navigate to posts page
      navigate('/dashboard/posts');
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(newPostActions.setError(null));

    // Validate image
    const currentImage = imagePreview || post?.image || '';
    if (!currentImage) {
      dispatch(
        newPostActions.setError(
          'Error: Image is required. Please add an image before updating the post.'
        )
      );
      return;
    }

    // Get form data and update post
    const formData = new FormData(e.currentTarget);
    const postData: PostUpdateInput = {
      id: postId as string,
      title: String(formData.get('title')) || 'Untitled Post',
      content: String(formData.get('content')) || '',
      image: currentImage,
      createdAt: post?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // The navigation will happen in the onSuccess callback
    updatePostMutation.mutate(postData);
  };

  if (isPending) return <Loading text="Loading post..." />;
  if (isError)
    return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-blue-900 dark:text-white mb-8">
        Edit Post
      </h1>

      {formError && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {formError}
        </div>
      )}

      <PostForm
        post={post || {}}
        handleSubmit={handleSubmit}
        isSubmitting={updatePostMutation.isPending}
      />
    </div>
  );
}
