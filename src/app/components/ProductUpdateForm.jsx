"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function ProductUpdateForm({ product, onUpdated }) {
  const [formData, setFormData] = useState({ title: "", description: "", price: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) setFormData({ title: product.title, description: product.description, price: product.price });
  }, [product]);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/products/${product._id}?id=${product._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        await Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Product updated successfully",
        });
        onUpdated();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.error || "Something went wrong",
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/products/${product._id}?id=${product._id}`, { method: "DELETE" });
      const data = await res.json();

      if (res.ok) {
        await Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Product deleted successfully",
        });
        onUpdated();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.error || "Something went wrong",
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-xl shadow flex flex-col gap-4">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Product Title"
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
    </form>
  );
}
