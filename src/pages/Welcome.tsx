import WelcomeNav from "../components/welcomPageComponents/WelcomeNav.tsx";
import FeatureCard from "../components/welcomPageComponents/FeatureCard.tsx";
import Hero from "../components/welcomPageComponents/Hero.tsx";
import CTA from "../components/welcomPageComponents/CTA.tsx";
import { FEATURES_DATA } from "../assets/FEATURES_DATA";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation Bar */}
      <WelcomeNav />
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <Hero />

          {/* Features Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-16 sm:mb-20">
            {FEATURES_DATA.map((feature, key) => (
              <FeatureCard
                key={key}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>

          {/* CTA Section */}
          <CTA />
        </div>
      </div>
    </div>
  );
}
