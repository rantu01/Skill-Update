"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-gray-900 text-white p-6 space-y-6 z-50
          w-64 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex-shrink-0
        `}
      >
        <div className="flex justify-between items-center md:hidden mb-4">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <button onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <h2 className="text-2xl font-bold hidden md:block">Dashboard</h2>

        <nav className="flex flex-col gap-4 h-screen">
          <Link href="/" onClick={() => setIsSidebarOpen(false)} className="hover:text-gray-300">
            🏠 Home
          </Link>
          <Link href="/products" onClick={() => setIsSidebarOpen(false)} className="hover:text-gray-300">
            📦 Products
          </Link>
          <Link href="/dashboard/add-product" onClick={() => setIsSidebarOpen(false)} className="hover:text-gray-300">
            ➕ Add Product
          </Link>
          <Link href="/dashboard/update-delete" onClick={() => setIsSidebarOpen(false)} className="hover:text-gray-300">
            ❌ Update Or Delete
          </Link>
        </nav>
      </aside>

      {/* Hamburger for mobile */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-gray-900 text-white rounded-md shadow-md"
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* Main content */}
      <main className="flex-1 md:mx-6 md:mt-6 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
