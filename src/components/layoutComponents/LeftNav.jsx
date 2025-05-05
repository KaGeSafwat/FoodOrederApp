import { NavLink } from "react-router-dom";

const cssClass =
  "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium";
const cssClassActive =
  "text-blue-600 dark:text-blue-400 px-3 py-2 border-b-2 border-blue-600 dark:border-blue-400 rounded-md text-sm font-medium";

export default function LeftNav() {
  return (
    <div className="flex items-center space-x-4">
      <NavLink
        to="/dashboard"
        className={({ isActive }) => (isActive ? cssClassActive : cssClass)}
        end
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/dashboard/posts"
        className={({ isActive }) => (isActive ? cssClassActive : cssClass)}
      >
        Posts
      </NavLink>
      <NavLink
        to="/dashboard/new-post"
        className={({ isActive }) => (isActive ? cssClassActive : cssClass)}
      >
        New Post
      </NavLink>
    </div>
  );
}
