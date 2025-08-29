"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Home,
  ShoppingCart,
  CheckCircle,
  User,
  LogIn,
  LogOut,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NavItem: React.FC<{
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}> = ({ to, icon, children, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === to;

  return (
    <Link
      href={to}
      onClick={onClick}
      className={`flex items-center px-4 py-2 mt-2 text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-gray-700 hover:text-gray-200 ${
        isActive ? "bg-gray-700 text-gray-200" : ""
      }`}
    >
      {icon}
      <span className="mx-4 font-medium">{children}</span>
    </Link>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { data: session } = useSession();
  const isAuthenticated = !!session;

  const closeSidebar = () => setIsOpen(false);

  const handleLogout = () => {
    closeSidebar();
    signOut(); 
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      ></div>

      {/* Sidebar */}
      <aside
        className={`flex bg-gray-800 flex-col w-64 h-screen px-4 py-8 bg-primary text-gray-100 border-r z-30 fixed inset-y-0 left-0 transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-white">Yatri Store</h2>
          <button
            className="lg:hidden text-gray-400 hover:text-white cursor-pointer"
            onClick={closeSidebar}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col justify-between flex-1 mt-6">
          <div>
            <NavItem to="/" icon={<Home className="w-5 h-5" />} onClick={closeSidebar}>
              Home
            </NavItem>
            <NavItem to="/cart" icon={<ShoppingCart className="w-5 h-5" />} onClick={closeSidebar}>
              Cart
            </NavItem>

            {isAuthenticated && (
              <>
                <NavItem to="/checkout" icon={<CheckCircle className="w-5 h-5" />} onClick={closeSidebar}>
                  Checkout
                </NavItem>
                <NavItem to="/profile" icon={<User className="w-5 h-5" />} onClick={closeSidebar}>
                  Profile
                </NavItem>
              </>
            )}
          </div>

          <div>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center cursor-pointer w-full px-4 py-2 mt-2 text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-gray-700 hover:text-gray-200"
              >
                <LogOut className="w-5 h-5" />
                <span className="mx-4 font-medium">Logout</span>
              </button>
            ) : (
              <NavItem to="/login" icon={<LogIn className="w-5 h-5" />} onClick={closeSidebar}>
                Login
              </NavItem>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
