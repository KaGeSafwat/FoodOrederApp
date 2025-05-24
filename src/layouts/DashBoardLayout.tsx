import { Outlet, useNavigate } from "react-router-dom";
import LeftNav from "../components/layoutComponents/LeftNav/LeftNav.tsx";
import RightNav from "../components/layoutComponents/RightNav/RightNav.tsx";
import { useEffect } from "react";
import { getTokenDuration } from "../utils/auth.ts";
import { useAppSelector } from "../store/hooks.ts";

export default function DashBoardLayout() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { isDarkMode } = useAppSelector((state) => state.rightNav);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user === "EXPIRED") {
      navigate("/logout");
      return;
    }

    const tokenDuration = getTokenDuration();

    // Only set up auto-logout if token duration is valid
    setTimeout(() => {
      navigate("/logout");
    }, tokenDuration);
  }, [user, navigate]);

  return (
    <>
      {/* header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 w-full z-50">
        {/* Navbar */}
        <nav className="flex justify-between h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Left side navigation */}
          <LeftNav />

          {/* Right side buttons */}
          <RightNav />
        </nav>
      </header>

      {/* Main content */}
      <main className=" bg-gray-50 dark:bg-gray-900 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </>
  );
}
