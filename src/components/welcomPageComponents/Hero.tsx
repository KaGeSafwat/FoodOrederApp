import { Link } from "react-router-dom";
import LandingDiagram from "../../UI/LandingDiagram";

export default function Hero() {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mb-16 sm:mb-20">
      <div className="flex-1 space-y-6 sm:space-y-8 text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
          Share Your Story with the World
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
          A powerful platform for bloggers to create, manage, and share their
          content with a beautiful dashboard experience.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Link
            to="/auth?mode=signup"
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity text-center"
          >
            Start Writing Now
          </Link>
          <Link
            to="/auth?mode=login"
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gray-800 text-gray-300 font-medium rounded-lg hover:bg-gray-700 transition-colors text-center"
          >
            Access Dashboard
          </Link>
        </div>
      </div>
      <LandingDiagram />
    </div>
  );
}
