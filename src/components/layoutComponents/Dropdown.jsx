import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.js";
import { useDispatch } from "react-redux";
import { rightNavActions } from "../../store/slices/rightNavSlice.js";
import { useNavigate } from "react-router-dom";

const cssClass =
  "flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700";
const cssClassActive =
  "flex items-center px-4 py-2 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20";

export default function Dropdown({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(rightNavActions.setIsUserMenuOpen(false));
      navigate("/logout");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  const username = user?.email.split("@")[0];
  return (
    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
      <div className="py-1">
        <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
          <p className="font-medium">{user?.email}</p>
          <p className="text-xs">{username}</p>
        </div>
        <NavLink
          className={({ isActive }) => (isActive ? cssClassActive : cssClass)}
          to="/dashboard"
          end
        >
          <span className="mr-2">📊</span>
          Dashboard
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? cssClassActive : cssClass)}
          to="/dashboard/posts"
        >
          <span className="mr-2">📝</span>
          Posts
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? cssClassActive : cssClass)}
          to="/dashboard/new-post"
        >
          <span className="mr-2">✏️</span>
          New Post
        </NavLink>
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <span className="mr-2">🚪</span>
          Sign Out
        </button>
      </div>
    </div>
  );
}
