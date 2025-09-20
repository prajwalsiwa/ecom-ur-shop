"use client";

import React from "react";
import Link from "next/link";
import { Menu, LogIn, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { data: session, status } = useSession();

  // Get first letter of name
  const getInitial = (name?: string | null) =>
    name?.charAt(0).toUpperCase() || "";

  return (
    <header className="bg-white shadow-md z-20">
      <div className="px-6 mx-auto py-4 flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-500 focus:outline-none lg:hidden cursor-pointer"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl flex-start flex font-bold text-gray-800 ml-4 lg:ml-0">
            <Link href="/">Your Shop</Link>
          </h1>
        </div>

        <div className="flex items-center">
          {status === "authenticated" && session?.user ? (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold">
                {getInitial(session.user.name)}
              </div>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-1 text-gray-600 font-semibold hover:text-red-500 cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:block">Logout</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center text-gray-600 hover:text-primary"
            >
              <LogIn className="w-5 h-5 mr-1" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
