import { Link } from "react-router-dom";
import { CTA_LINK_DATA } from "../../assets/LINK_DATA";

export default function CTA() {
  return (
    <div className="text-center px-4  sm:px-0">
      <div className="inline-block bg-gray-800/50 backdrop-blur-sm mb-5 p-6 sm:p-8 rounded-lg border border-gray-700 max-w-2xl">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
          Ready to Start Your Blog?
        </h2>
        <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
          Join our community of writers and share your stories with the world.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          {CTA_LINK_DATA.map((link, key) => (
            <Link key={key} to={link.to} className={link.className}>
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
