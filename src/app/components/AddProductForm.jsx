"use client";

import { useState } from "react";

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    category: "",
    price: "",
    color: "",
    size: "",
    image: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Convert size input (comma separated) to array
    const productData = { ...formData, size: formData.size.split(",").map(s => s.trim()) };

    try {
      const res = await fetch("/api/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Product added successfully!");
        setFormData({
          title: "",
          brand: "",
          category: "",
          price: "",
          color: "",
          size: "",
          image: "",
          description: "",
        });
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (err) {
      setMessage("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-xl shadow mt-10 flex flex-col gap-4">
      <input
        type="text"
        name="title"
        placeholder="Product Title"
        value={formData.title}
        onChange={handleChange}
        required
        className="border px-4 py-2 rounded"
      />
      <input
        type="text"
        name="brand"
        placeholder="Brand"
        value={formData.brand}
        onChange={handleChange}
        required
        className="border px-4 py-2 rounded"
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
        className="border px-4 py-2 rounded"
      />
      <input
        type="text"
        name="color"
        placeholder="Color"
        value={formData.color}
        onChange={handleChange}
        required
        className="border px-4 py-2 rounded"
      />
      <input
        type="text"
        name="size"
        placeholder="Sizes (comma separated, e.g. S,M,L)"
        value={formData.size}
        onChange={handleChange}
        required
        className="border px-4 py-2 rounded"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
        className="border px-4 py-2 rounded"
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
        required
        className="border px-4 py-2 rounded"
      />
      <textarea
        name="description"
        placeholder="Product Description"
        value={formData.description}
        onChange={handleChange}
        required
        className="border px-4 py-2 rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
      {message && <p className="mt-2 text-center">{message}</p>}
    </form>
  );
}
