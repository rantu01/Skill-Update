"use client";

import { useState, useEffect } from "react";

export default function ProductUpdateForm({ product, onUpdated }) {
  const [formData, setFormData] = useState({ name: "", description: "", price: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (product) setFormData({ name: product.name, description: product.description, price: product.price });
  }, [product]);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`/api/products/${product._id}?id=${product._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Product updated successfully!");
        onUpdated();
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch {
      setMessage("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/products/${product._id}?id=${product._id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Product deleted successfully!");
        onUpdated();
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch {
      setMessage("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-xl shadow flex flex-col gap-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product Name"
        required
        className="border px-4 py-2 rounded"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Product Description"
        required
        className="border px-4 py-2 rounded"
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        required
        className="border px-4 py-2 rounded"
      />
      <div className="flex gap-2">
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          {loading ? "Updating..." : "Update"}
        </button>
        <button type="button" onClick={handleDelete} disabled={loading} className="px-4 py-2 bg-red-500 text-white rounded-lg">
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
      {message && <p className="text-center">{message}</p>}
    </form>
  );
}
