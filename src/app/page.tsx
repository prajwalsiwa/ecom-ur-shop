/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { fetcher } from "@/lib/fetcher";
import ProductCard from "@/components/ProductCard";
import ProductGridSkeleton from "@/components/ProductGridSkeleton";
import Pagination from "@/components/Pagination";

const PRODUCTS_PER_PAGE = 6;

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    fetcher("https://fakestoreapi.com/products")
      .then((data) => {
        setProducts(data);
      })
      .catch(() => {
        setError("Unable to fetch products");
        toast.error("Failed to load products");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ProductGridSkeleton />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  // Filter products
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  return (
    <div className="p-4">
      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Product Lists */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentProducts.length > 0 ? (
          currentProducts.map((p) => <ProductCard key={p.id} product={p} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
}
