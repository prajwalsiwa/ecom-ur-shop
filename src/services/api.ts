/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetcher } from "@/lib/fetcher";

export const getProducts = async () => {
  try {
    return await fetcher("https://fakestoreapi.com/products");
  } catch (error: any) {
    console.error("Error fetching products:", error.message);
    throw new Error("Failed to fetch products");
  }
};

export const getProductById = async (id: string | string[]) => {
  try {
    return await fetcher(`https://fakestoreapi.com/products/${id}`);
  } catch (error: any) {
    console.error(`Error fetching product ${id}:`, error.message);
    throw new Error("Failed to fetch product");
  }
};
