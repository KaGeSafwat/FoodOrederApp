export default function Feature({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors">
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
        <span className="text-xl sm:text-2xl">{icon}</span>
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-gray-400">{description}</p>
    </div>
  );
}
