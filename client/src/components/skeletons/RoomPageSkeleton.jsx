import React from "react";

const RoomPageSkeleton = () => {
  return (
    <div className="bg-gray-100 -mx-8 lg:px-32 px-8 animate-pulse">
      <div className="h-6 bg-gray-300 w-3/4 my-6"></div>
      <div className="flex gap-2 underline text-gray-700 font-semibold">
        <div className="bg-gray-300 rounded-full w-6 h-6"></div>
        <div className="h-6 bg-gray-300 w-1/2"></div>
      </div>

      <div className="bg-gray-300 rounded-2xl h-72 my-6"></div>
      <div className="h-6 bg-gray-300 w-2/3 my-4"></div>

      <div className="py-8 flex flex-col sm:flex-row gap-8">
        <div className="border-t border-gray-300 w-full">
        </div>
      </div>
    </div>
  );
};

export default RoomPageSkeleton;
