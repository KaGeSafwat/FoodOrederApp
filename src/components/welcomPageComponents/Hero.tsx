import { Link } from "react-router-dom";
import LandingDiagram from "../../UI/LandingDiagram";
import { HERO_LINK_DATA } from "../../assets/LINK_DATA";

export default function Hero() {
  return (
    <section className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mb-16 sm:mb-20">
      <div className="flex-1 space-y-6 sm:space-y-8 text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
          Share Your Story with the World
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
          A powerful platform for bloggers to create, manage, and share their
          content with a beautiful dashboard experience.
        </p>
        <ul className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          {HERO_LINK_DATA.map((link, key) => (
            <li key={key} className={link.className}>
              <Link to={link.to} className={link.className}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <LandingDiagram />
    </section>
  );
}
