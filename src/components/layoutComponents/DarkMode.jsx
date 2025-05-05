import { useDispatch, useSelector } from "react-redux";
import { rightNavActions } from "../../store/slices/rightNavSlice.js";
import { useEffect } from "react";

export default function DarkMode() {
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector((state) => state.rightNav);

  // Optimized useEffect for dark mode
  useEffect(() => {
    const savedMode = localStorage.getItem("mode");
    const isDark = savedMode === "dark";

    dispatch(rightNavActions.setIsDarkMode(isDark));
    document.documentElement.classList.toggle("dark", isDark);
  }, [dispatch]);

  // Optimized toggleDarkMode function
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    dispatch(rightNavActions.setIsDarkMode(newDarkMode));

    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("mode", newDarkMode ? "dark" : "light");
  };
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
    >
      {isDarkMode ? "🌞" : "🌙"}
    </button>
  );
}
