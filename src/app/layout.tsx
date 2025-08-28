"use client";

import Sidebar from "@/components/Sidebar";
import { Providers } from "@/Providers";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import './globals.css'; 


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen flex">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
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
