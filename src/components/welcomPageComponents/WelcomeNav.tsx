import { Link } from "react-router-dom";
import { NAV_LINK_DATA } from "../../assets/LINK_DATA";

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
            {NAV_LINK_DATA.map((link, key) => (
              <Link key={key} to={link.to} className={link.className}>
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
