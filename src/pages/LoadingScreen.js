import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 backdrop-blur-md z-50">
      <div className="text-center">
        <div className="text-2xl font-semibold text-gray-700 animate-pulse">Loading...</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
