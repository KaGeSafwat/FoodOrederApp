import WelcomeNav from "../components/welcomPageComponents/WelcomeNav.tsx";
import FeatureCard from "../components/welcomPageComponents/FeatureCard.tsx";
import Hero from "../components/welcomPageComponents/Hero.tsx";
import CTA from "../components/welcomPageComponents/CTA.tsx";
import { FEATURES_DATA } from "../assets/FEATURES_DATA.ts";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation Bar */}
      <WelcomeNav />
      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28">
        <section className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <Hero />

          {/* Features Section */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-16 sm:mb-20">
            {FEATURES_DATA.map((feature, key) => (
              <li
                key={key}
                className="bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors"
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
        </section>
      </main>
    </div>
  );
}
