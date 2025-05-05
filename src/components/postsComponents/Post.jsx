import {
  HiOutlineCalendar,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineClock,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../utils/fetch";
import { deletePost } from "../../utils/fetch";
import {
  formatDate,
  formatRelativeTime,
  truncateText,
  toTitleCase,
} from "../../utils/format";
import { useState } from "react";

export default function Post({ post }) {
  const [isDeleting, setIsDeleting] = useState(false);

  // Consolidated mutation with optimistic updates
  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previousPosts = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["posts"], postId);

      return { previousPosts };
    },
    onError: (context) => {
      queryClient.setQueryData(["posts"], context.previousPosts);
      setIsDeleting(false);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm("Are you sure you want to delete this post?")) {
      setIsDeleting(true);
      deletePostMutation.mutate(post.id);
      setIsDeleting(false);
    }
  };

  return (
    <div className="post-card bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
      {/* Image container with overlay on hover */}
      <div className="relative w-full h-48 overflow-hidden group">
        <img
          src={
            post.image || "https://via.placeholder.com/800x400?text=No+Image"
          }
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/800x400?text=Image+Error";
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
          {toTitleCase(post.title) || "Untitled Post"}
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
              title={isDeleting ? "Deleting..." : "Delete post"}
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
