import {
  HiOutlineCalendar,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineClock,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import type { Post } from "../../../utils/fetch.ts";
import {
  formatDate,
  formatRelativeTime,
  truncateText,
  toTitleCase,
} from "../../../utils/format.ts";
import { useCallback, type SyntheticEvent } from "react";
import { useAppMutations } from "../../../hooks/useAppMutation.tsx";
import { Button } from "../../../UI/Button.tsx";

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  const { deletePost, isError, error } = useAppMutations();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(post.id);
    }
  };
  const renderImage = useCallback(() => {
    return (
      <div className="relative w-full h-48 overflow-hidden group">
        <img
          src={
            post.image || "https://via.placeholder.com/800x400?text=No+Image"
          }
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e: SyntheticEvent<HTMLImageElement>) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://via.placeholder.com/800x400?text=Image+Error";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </div>
    );
  }, [post]);
  const renderError = useCallback(() => {
    if (isError) {
      return (
        <div className="p-3 m-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm">
          Error: {error?.message}
        </div>
      );
    }
  }, [isError, error]);
  const renderContent = useCallback(() => {
    return (
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
        <h2 className="font-bold text-xl text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {toTitleCase(post.title) || "Untitled Post"}
        </h2>

        {/* Content preview */}
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {truncateText(post.content)}
        </div>

        {/* Actions */}
        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end items-center">
          <div className="flex items-center space-x-2">
            <Link
              to={`/dashboard/posts/${post.id}/edit`}
              className="flex justify-center items-center p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-colors"
            >
              <HiOutlinePencil className="w-5 h-5 mr-1" />
              Edit Post
            </Link>
            <Button
              onClick={handleDelete}
              className="flex justify-center items-center p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-colors"
            >
              <HiOutlineTrash className="w-5 h-5 mr-1" />
              Delete Post
            </Button>
          </div>
        </div>
      </div>
    );
  }, [post, handleDelete]);

  return (
    <div className="post-card bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
      {/* Image container with overlay on hover */}
      {renderImage()}

      {/* Content */}
      {renderContent()}

      {renderError()}
    </div>
  );
}
