import WelcomeNav from '../components/welcomPageComponents/WelcomeNav.tsx';
import Feature from '../components/welcomPageComponents/Feature.tsx';
import Hero from '../components/welcomPageComponents/Hero.tsx';
import CTA from '../components/welcomPageComponents/CTA.tsx';

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
            <Feature
              title="Create Your Profile"
              description="Customize your profile with a unique username and profile picture."
              icon="👤"
            />
            <Feature
              title="Write Your Story"
              description="Craft your blog posts with our user-friendly editor."
              icon="✍️"
            />
            <Feature
              title="Manage Your Content"
              description="Organize and edit your posts with our powerful dashboard."
              icon="📊"
            />
            <Feature
              title="Secure Access"
              description="Protected routes and secure authentication for your content."
              icon="🔒"
            />
          </div>

          {/* CTA Section */}
          <CTA />
        </div>
      </div>
    </div>
  );
}
