import { Link } from "react-router-dom";

export default function WelcomeNav() {
  return (
    <nav className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              BlogDash
            </span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link
              to="/auth?mode=login"
              className="text-gray-300 hover:text-white px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Login
            </Link>
            <Link
              to="/auth?mode=signup"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
