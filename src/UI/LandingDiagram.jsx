export default function LandingDiagram() {
  return (
    <div className="flex-1 w-full max-w-lg mx-auto lg:max-w-none">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-30"></div>
        <div className="relative bg-gray-800 rounded-lg p-4 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="h-3 sm:h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 sm:h-4 bg-gray-700 rounded"></div>
            <div className="h-3 sm:h-4 bg-gray-700 rounded w-5/6"></div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
              <div className="h-16 sm:h-20 bg-gray-700 rounded"></div>
              <div className="h-16 sm:h-20 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
