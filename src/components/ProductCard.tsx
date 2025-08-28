/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Product } from "@/types";


interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-1 duration-300 flex flex-col group">
      <div className="relative p-4 h-60">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain"
        />
        <Link
          href={`/products/${product.id}`}
          className="absolute inset-0 bg-black/20 bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
        >
          <div className="bg-white text-gray-800 p-3 rounded-full">
            <Eye className="w-6 h-6" />
          </div>
        </Link>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3
          className="text-lg font-semibold text-gray-800 truncate mb-1"
          title={product.title}
        >
          {product.title}
        </h3>
        <p className="text-sm text-gray-500 capitalize mb-2">
          {product.category}
        </p>
        <div className="mt-auto flex justify-between items-center">
          <p className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
          <Link
            href={`/products/${product.id}`}
            className="text-sm font-medium text-secondary hover:text-orange-500"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
