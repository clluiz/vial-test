import React from "react"

export const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-40 w-full">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-sky-700 border-solid"></div>
      <span className="ml-4 text-sky-700 font-medium">Loading...</span>
    </div>
  );
}