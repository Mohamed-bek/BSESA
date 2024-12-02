import React from "react";
import { FaBookOpen, FaEye } from "react-icons/fa";

function ResearchBox({ research }) {
  return (
    <div
      key={research.id}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={research.thumbnail}
          alt={research.title}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-3 right-3 bg-primaryTra text-primary px-3 py-1 rounded-full text-sm flex items-center">
          <FaBookOpen className="mr-2 h-4 w-4" />
          {research.category.name}
        </span>
      </div>

      {/* Research Details */}
      <div className="">
        <div className="px-5 pt-5">
          <h2 className="text-xl font-bold text-blackColor h-[56px] mb-2 line-clamp-2">
            {research.title}
          </h2>
          <p className="text-blackColor h-[72px] mb-4 line-clamp-3">
            {research.abstract}
          </p>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {research.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="bg-primaryTra text-primary px-2 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        {/* Metadata */}
        <div className="flex justify-between items-center bg-primary font-medium  py-5 px-5 text-white">
          <div className="flex items-center space-x-2">
            <FaEye className="h-4 w-4" />
            <span>{research.views} Views</span>
          </div>
          <span>{research.createdAt.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}

export default ResearchBox;
