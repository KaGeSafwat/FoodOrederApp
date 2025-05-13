import {
  HiOutlineCalendar,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineClock,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { queryClient, deletePost } from '../../utils/fetch.ts';
import type { Post, PostsData } from '../../utils/fetch.ts';
import {
  formatDate,
  formatRelativeTime,
  truncateText,
  toTitleCase,
} from '../../utils/format.ts';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { type MouseEvent, type SyntheticEvent } from 'react';

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  // Consolidated mutation with optimistic updates
  const deletePostMutation = useMutation<
    { success: boolean; id: string },
    Error,
    string
  >({
    mutationFn: deletePost,
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      const previousPosts = queryClient.getQueryData<PostsData>(['posts']);

      // Optimistically update the UI by removing the post
      queryClient.setQueryData<PostsData>(['posts'], (old) => {
        if (!old) return old;

        return {
          ...old,
          posts: old.posts.filter((p: Post) => p.id !== postId),
          totalPosts: old.totalPosts - 1,
          totalPages: Math.max(1, Math.ceil((old.totalPosts - 1) / 4)),
        };
      });

      return { previousPosts };
    },
    onError: (err: Error, context: unknown) => {
      // Revert to previous state if mutation fails
      const typedContext = context as { previousPosts?: PostsData };
      if (typedContext && typedContext.previousPosts) {
        queryClient.setQueryData(['posts'], typedContext.previousPosts);
      }
      setIsDeleting(false);

      // Show error toast
      toast.error(`Failed to delete post: ${err.message}`, {
        position: 'top-right',
        autoClose: 3000,
      });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setIsDeleting(false);

      // Show success toast
      toast.success('Post deleted successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
    },
  });

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm('Are you sure you want to delete this post?')) {
      setIsDeleting(true);
      deletePostMutation.mutate(post.id);
      // isDeleting will be set to false in onSuccess or onError callbacks
    }
  };

  return (
    <div className="post-card bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
      {/* Image container with overlay on hover */}
      <div className="relative w-full h-48 overflow-hidden group">
        <img
          src={
            post.image || 'https://via.placeholder.com/800x400?text=No+Image'
          }
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e: SyntheticEvent<HTMLImageElement>) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/800x400?text=Image+Error';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </div>

      {/* Content */}
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
          <div className="flex items-center">
            <HiOutlineCalendar className="mr-1 text-blue-600 dark:text-blue-400" />
            {formatDate(post.createdAt)}
          </div>
          <div className="flex items-center">
            <HiOutlineClock className="mr-1 text-blue-600 dark:text-blue-400" />
            {formatRelativeTime(post.createdAt)}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {toTitleCase(post.title) || 'Untitled Post'}
        </h3>

        {/* Content preview */}
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {truncateText(post.content)}
        </div>

        {/* Actions */}
        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end items-center">
          <div className="flex space-x-2">
            <Link
              to={`/dashboard/posts/${post.id}/edit`}
              className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-colors"
              title="Edit post"
            >
              <HiOutlinePencil className="w-5 h-5" />
            </Link>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-colors"
              title={isDeleting ? 'Deleting...' : 'Delete post'}
            >
              <HiOutlineTrash className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {deletePostMutation.isError && (
        <div className="p-3 m-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm">
          Error: {deletePostMutation.error.message}
        </div>
      )}
    </div>
  );
}
