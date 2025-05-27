import WelcomeNav from "../components/welcomPageComponents/NavBar/WelcomeNav.tsx";
import FeatureCard from "../components/welcomPageComponents/FeatureCard/FeatureCard.tsx";
import Hero from "../components/welcomPageComponents/Hero/Hero.tsx";
import CTA from "../components/welcomPageComponents/CTA/CTA.tsx";
import { FEATURES_DATA } from "../assets/FEATURES_DATA.ts";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation Bar */}
      <WelcomeNav />
      {/* Main Content */}
      <main className="container mx-auto max-w-6xl  px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28">
        {/* Hero Section */}
        <Hero />
        {/* Features Section */}

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-16 sm:mb-20">
          {FEATURES_DATA.map((feature, key) => (
            <li
              key={key}
              className="bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors text-center flex flex-col items-center md:text-left md:items-start"
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            </li>
          ))}
        </ul>
        {/* CTA Section */}
        <CTA />
      </main>
    </div>
  );
}
