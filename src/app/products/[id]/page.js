"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductDetails from "../../components/ProductDetails";
import { Loader2 } from "lucide-react";

export default function ProductDetailsPage() {
  const params = useParams();
  const { id } = params;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/${id}?id=${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-[#3338A0]" />
      </div>
    );
  }
  if (!product) return <p className="text-center mt-10 text-red-500">Product not found</p>;

  return <ProductDetails product={product} />;
}
