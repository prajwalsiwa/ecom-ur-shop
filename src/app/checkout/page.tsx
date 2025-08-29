"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { clearCart } from "@/store/slices/cartSlice";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  const [orderPlaced, setOrderPlaced] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const handlePlaceOrder = () => {
    setTimeout(() => {
      dispatch(clearCart());
      setOrderPlaced(true);

      toast.success(
        <div className="flex items-center gap-2">
          <span className="text-lg">🎉</span>
          <span className="font-medium">Order placed successfully!</span>
        </div>,
        {
          style: {
            borderRadius: "12px",
            background: "#4CAF50",
            color: "#fff",
            padding: "12px 16px",
          },
          icon: null,
        }
      );
    }, 1000);
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) return null;

  if (orderPlaced) {
    return (
      <div className="text-center bg-white p-10 rounded-lg shadow-md">
        <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">
          Thank you for your order!
        </h2>
        <p className="text-gray-500 mb-6">
          Your order has been placed and is being processed.
        </p>
        <Link
          href="/"
          className="bg-secondary text-white py-2 px-6 rounded-lg hover:bg-orange-500 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Your cart is empty.</h2>
        <Link href="/" className="text-secondary hover:underline">
          Go back to shopping.
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 border-b pb-4">
          Order Summary
        </h2>

        <div className="space-y-2 mb-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <span className="truncate w-3/4">
                {item.title} (x{item.quantity})
              </span>
              <span className="font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Total items</span>
            <span>{totalItems}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total Price</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full mt-6 bg-gray-700 text-white py-3 px-6 rounded-lg hover:bg-primary-hover transition-colors cursor-pointer"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
