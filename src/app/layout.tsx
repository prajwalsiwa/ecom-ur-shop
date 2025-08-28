"use client";

import Sidebar from "@/components/Sidebar";
import { Providers } from "@/Providers";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { usePathname } from "next/navigation";

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
      <body>
        <Providers>
          <div className="min-h-screen flex">
            {showSidebar && (
              <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            )}

            <main className="flex-1 p-6">
              {children}
              <Toaster position="top-right" />
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
