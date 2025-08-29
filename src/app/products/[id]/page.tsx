"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ShoppingCart, Star, ChevronLeft } from "lucide-react";
import { Product } from "@/types";
import ProductInfoSkeleton from "@/components/ProductInfoSkeleton";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/slices/cartSlice";
import Toaster from "@/components/Toaster";
import { getProductById } from "@/services/api";

const ProductDetailPage: React.FC = () => {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    if (!id) return;

    const getProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch {
        setError("Product not found or failed to load.");
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (loading) return <ProductInfoSkeleton />;

  if (error)
    return (
      <div className="text-center text-red-500 text-xl mt-10">{error}</div>
    );
  if (!product)
    return <div className="text-center text-xl mt-10">Product not found.</div>;

  const handleAddToCart = () => {
    if (!product) {
      Toaster("Product not found", false);
      return;
    }

    try {
      dispatch(
        addItem({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
        })
      );
      Toaster(`Added ${product.title} to cart`, true, product.image);
    } catch {
      Toaster("Failed to add to cart", false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Link
        href="/"
        className="flex items-center text-gray-500 hover:text-gray-800 mb-6"
      >
        <ChevronLeft size={20} />
        Back to products
      </Link>

      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 flex justify-center items-center p-4 relative">
          {/* image skeleton */}
          {!imgLoaded && (
            <div className="absolute inset-0 bg-gray-300 animate-pulse rounded" />
          )}

          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className="max-h-96 object-contain relative"
            onLoadingComplete={() => setImgLoaded(true)}
          />
        </div>

        <div className="md:w-1/2 flex flex-col justify-center">
          <p className="text-sm text-gray-500 capitalize mb-2">
            {product.category}
          </p>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

          <div className="flex items-center mb-4">
            <div className="flex items-center text-yellow-500">
              {[...Array(Math.round(product.rating.rate))].map((_, i) => (
                <Star key={i} fill="currentColor" size={20} />
              ))}
              {[...Array(5 - Math.round(product.rating.rate))].map((_, i) => (
                <Star key={i} size={20} />
              ))}
            </div>
            <span className="text-gray-600 ml-2">
              ({product.rating.count} reviews)
            </span>
          </div>

          <p className="text-3xl font-light text-gray-900 mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          <button
            onClick={handleAddToCart}
            className="flex items-center cursor-pointer justify-center bg-primary text-white hover:bg-gray-700 bg-gray-800 py-3 px-6 rounded-lg hover:bg-primary-hover transition-colors w-full sm:w-auto"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
