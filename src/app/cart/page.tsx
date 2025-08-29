/* eslint-disable @next/next/no-img-element */
"use client";

import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import Link from "next/link";
import {  increment, decrement, removeItem } from "@/store/slices/cartSlice";

const CartPage: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + item.quantity * item.price, 0);

  if (items.length === 0)
    return (
      <div className="text-center bg-white p-10 rounded-lg shadow-md">
        <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven&apos;t added anything yet.</p>
        <Link href="/" className="bg-secondary text-white py-2 px-6 rounded-lg hover:bg-orange-500 transition-colors">
          Start Shopping
        </Link>
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">

        {/* card items  */}
    
        <div className="flex-grow lg:w-2/3 bg-white p-6 rounded-lg shadow-md">
          <ul className="divide-y divide-gray-200">
            {items.map(item => (
              <li key={item.id} className="flex flex-col sm:flex-row items-center py-4">
                <img src={item.image} alt={item.title} className="w-24 h-24 object-contain mb-4 sm:mb-0 sm:mr-4" />
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-500">${item.price.toFixed(2)}</p>
                </div>

             
                <div className="flex items-center my-4 sm:my-0 sm:mx-4">
                  <button
                    className="p-1 border rounded-l-md hover:bg-gray-100 cursor-pointer"
                    onClick={() => dispatch(decrement(item.id))}
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="text"
                    value={item.quantity}
                    readOnly
                    className="w-12 text-center border-t border-b"
                  />
                  <button
                    className="p-1 border rounded-r-md hover:bg-gray-100 cursor-pointer"
                    onClick={() => dispatch(increment(item.id))}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <p className="font-semibold w-24 text-center sm:text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>

                <button
                  onClick={() => dispatch(removeItem(item.id))}
                  className="text-gray-500 hover:text-red-500 ml-4 cursor-pointer"
                >
                  <Trash2 size={20} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-semibold border-b pb-4 mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal ({totalItems} items)</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-4">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <Link
            href="/checkout"
            className="block text-center bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-primary-hover transition-colors w-full mt-6"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
