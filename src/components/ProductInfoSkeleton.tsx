"use client";
import React from "react";

const ProductInfoSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto p-4 animate-pulse">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 h-96 bg-gray-300 rounded"></div>
        <div className="md:w-1/2 space-y-4">
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-10 bg-gray-300 rounded w-1/3"></div>
          <div className="h-20 bg-gray-300 rounded"></div>
          <div className="h-12 bg-gray-300 rounded w-48"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoSkeleton;
