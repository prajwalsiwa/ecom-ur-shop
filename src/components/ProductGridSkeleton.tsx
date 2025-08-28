"use client";

import React from "react";

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col animate-pulse">
    
      <div className="relative p-4 h-60 bg-gray-200 rounded-lg"></div>

  
      <div className="p-4 flex flex-col flex-grow space-y-2">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div> 
        <div className="h-4 bg-gray-200 rounded w-1/2"></div> 
        <div className="mt-auto flex justify-between items-center">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div> 
          <div className="h-6 bg-gray-200 rounded w-1/4"></div> 
        </div>
      </div>
    </div>
  );
};

const ProductGridSkeleton: React.FC<{ count?: number }> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <ProductCardSkeleton key={idx} />
      ))}
    </div>
  );
};

export default ProductGridSkeleton;
