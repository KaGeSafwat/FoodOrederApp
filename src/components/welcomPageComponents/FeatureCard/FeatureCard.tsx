export type Feature = {
  title: string;
  description: string;
  icon: string;
};

export default function FeatureCard({ title, description, icon }: Feature) {
  return (
    <>
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 sm:mb-6 text-xl sm:text-2xl">
        {icon}
      </div>
      <h2 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3 ">
        {title}
      </h2>
      <p className="text-sm sm:text-base text-gray-400 ">{description}</p>
    </>
  );
}
