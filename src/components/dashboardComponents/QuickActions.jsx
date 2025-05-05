import { Link } from "react-router-dom";
import {
  HiOutlineDocumentText,
  HiOutlinePhotograph,
  HiOutlineUserGroup,
} from "react-icons/hi";

export default function QuickActions() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-blue-900 dark:text-white">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Link
          to="/dashboard/new-post"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all flex items-center"
        >
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4">
            <HiOutlineDocumentText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">
              Create New Post
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Share your thoughts with the world
            </p>
          </div>
        </Link>

        <Link
          to="/dashboard/posts"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all flex items-center"
        >
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full mr-4">
            <HiOutlinePhotograph className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">
              Manage Posts
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Edit or delete your existing posts
            </p>
          </div>
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all flex items-center">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full mr-4">
            <HiOutlineUserGroup className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">
              View Analytics
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Track your content performance
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
