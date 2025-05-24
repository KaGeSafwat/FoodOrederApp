import { Link } from "react-router-dom";
import { NAV_LINK_DATA } from "../../../assets/LINK_DATA";

export default function WelcomeNav() {
  return (
    <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 fixed w-full top-0 z-50 flex justify-between items-center h-16 mx-auto px-4 sm:px-6 lg:px-8">
      <div className=" text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        BlogDash
      </div>
      <nav>
        <ul className="flex items-center space-x-2 sm:space-x-4">
          {NAV_LINK_DATA.map((link, key) => (
            <li key={key}>
              <Link to={link.to} className={link.className}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
