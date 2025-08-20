"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AddProductForm from "../../components/AddProductForm";

export default function AddProductPage() {
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
    <div className="min-h-screen px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Add New Product</h1>
      <AddProductForm />
    </div>
  );
}
