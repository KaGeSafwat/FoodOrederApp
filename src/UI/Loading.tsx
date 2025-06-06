type Size = "small" | "medium" | "large";
type spinnerSizes = {
  small: string;
  medium: string;
  large: string;
};
interface LoadingProps {
  size?: Size;
  text?: string;
  className?: string;
}

const Loading = ({
  size = "medium",
  text = "Loading...",
  className = "",
}: LoadingProps) => {
  const spinnerSizes: spinnerSizes = {
    small: "w-5 h-5",
    medium: "w-10 h-10",
    large: "w-16 h-16",
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        data-testid="loading-spinner"
        className={`${spinnerSizes[size]} border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin ${className}`}
      ></div>
      {text && <p className="mt-3 text-gray-600">{text}</p>}
    </div>
  );
};

export default Loading;
