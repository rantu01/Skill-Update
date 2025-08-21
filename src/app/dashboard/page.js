"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



export default function DashboardHome() {
    const { data: session, status } = useSession();
      const router = useRouter();
    
      useEffect(() => {
        if (status === "unauthenticated") {
          router.push("/login");
        }
      }, [status, router]);
    
      if (status === "loading") return <p className="text-center mt-10">Checking session...</p>;
      if (!session) return null; // redirecting
  return (
    <div className="mt-18 px-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">📦 Total Products</h2>
          <p className="text-2xl font-bold">120</p>
        </div>
        <div className="bg-white shadow p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">👥 Users</h2>
          <p className="text-2xl font-bold">85</p>
        </div>
        <div className="bg-white shadow p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">💰 Sales</h2>
          <p className="text-2xl font-bold">$4,230</p>
        </div>
      </div>
    </div>
  );
}
