"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">MyShop</h1>
      <div className="space-x-4 flex items-center">
        <Link href="/" className="hover:text-gray-300">Home</Link>
        <Link href="/products" className="hover:text-gray-300">Products</Link>

        {session ? (
          <>
            <Link href="/dashboard/add-product" className="hover:text-gray-300">Dashboard</Link>
            <button
              onClick={() => signOut()}
              className="ml-2 px-3 py-1 bg-red-500 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="hover:text-gray-300">Login</Link>
        )}
      </div>
    </nav>
  );
}
