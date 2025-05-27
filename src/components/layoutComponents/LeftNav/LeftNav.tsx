import { NavLink } from "react-router-dom";

const cssClass =
  "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-2 py-2 rounded-md text-sm font-medium";
const cssClassActive =
  "text-blue-600 dark:text-blue-400 px-3 py-2 border-b-2 border-blue-600 dark:border-blue-400 rounded-md text-sm font-medium";
type NavLink = {
  to: string;
  title: string;
  end?: boolean;
};
const NAVLINK: NavLink[] = [
  {
    to: "/dashboard",
    title: "Dashboard",
    end: true,
  },
  {
    to: "/dashboard/posts",
    title: "Posts",
  },
  {
    to: "/dashboard/new-post",
    title: "New Post",
  },
];
export default function LeftNav() {
  return (
    <ul className="flex items-center space-x-2 md:space-x-4">
      {NAVLINK.map((link) => (
        <li key={link.to}>
          <NavLink
            to={link.to}
            className={({ isActive }) => (isActive ? cssClassActive : cssClass)}
            end={link.end}
          >
            {link.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
