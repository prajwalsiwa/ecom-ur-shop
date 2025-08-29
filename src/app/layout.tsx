"use client";

import Sidebar from "@/components/Sidebar";
import { Providers } from "@/Providers";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const showSidebar = pathname !== "/login";

  return (
    <html lang="en">
      <body className="overflow-hidden ">
        <Providers>
          <div className="h-screen flex w-full">
            {showSidebar && (
              <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            )}
            <div className="flex flex-col w-full">
              {showSidebar && (
                <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
              )}

              <main className="flex-1 p-6 mt-0 lg:mt-0 overflow-auto">
                {children}
                <Toaster position="bottom-right" 
                 />
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
