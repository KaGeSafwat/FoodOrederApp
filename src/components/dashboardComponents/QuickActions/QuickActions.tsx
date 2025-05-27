import { Link } from "react-router-dom";
import { type ReactNode } from "react";
import {
  HiOutlineDocumentText,
  HiOutlinePhotograph,
  HiOutlineUserGroup,
} from "react-icons/hi";

type Actions = {
  to: string;
  title: string;
  description: string;
  icon: ReactNode;
}[];

const ACTIONS: Actions = [
  {
    to: "/dashboard/new-post",
    title: "Create New Post",
    description: "Share your thoughts with the world",
    icon: (
      <HiOutlineDocumentText
        data-testid="create-post-icon"
        className="w-6 h-6 text-blue-600 dark:text-blue-400"
      />
    ),
  },
  {
    to: "/dashboard/posts",
    title: "Manage Posts",
    description: "Edit or delete your existing posts",
    icon: (
      <HiOutlinePhotograph
        data-testid="manage-posts-icon"
        className="w-6 h-6 text-purple-600 dark:text-purple-400"
      />
    ),
  },
  {
    to: "/dashboard/posts",
    title: "View Analytics",
    description: "Track your content performance",
    icon: (
      <HiOutlineUserGroup
        data-testid="analytics-icon"
        className="w-6 h-6 text-green-600 dark:text-green-400"
      />
    ),
  },
];

export default function QuickActions() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-blue-900 dark:text-white">
        Quick Actions
      </h2>
      <ul
        data-testid="quick-actions-grid"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      >
        {ACTIONS.map((action, key) => (
          <li
            key={key}
            className="border border-transparent rounded-xl hover:border-blue-500/50"
          >
            <Link
              to={action.to}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all flex flex-col md:flex-row items-center justify-center text-center md:text-left"
            >
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-2 md:mr-4">
                {action.icon}
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {action.description}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
