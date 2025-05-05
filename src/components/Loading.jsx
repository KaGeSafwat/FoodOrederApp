import React from "react";

const Loading = ({ size = "medium", text = "Loading..." }) => {
  const spinnerSizes = {
    small: "w-5 h-5",
    medium: "w-10 h-10",
    large: "w-16 h-16",
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`${spinnerSizes[size]} border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin`}
      ></div>
      {text && <p className="mt-3 text-gray-600">{text}</p>}
    </div>
  );
};

export default Loading;
