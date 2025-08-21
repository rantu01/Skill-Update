"use client";

import { useState, useEffect } from "react";
import ProductUpdateForm from "../../components/ProductUpdateForm";
import { X } from "lucide-react";

export default function UserProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products"); // Adjust API endpoint
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Products</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full table-auto border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">#</th>
                  <th className="px-4 py-2 border">Image</th>
                  <th className="px-4 py-2 border">Title</th>
                  <th className="px-4 py-2 border">Description</th>
                  <th className="px-4 py-2 border">Price</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product._id} className="text-center">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-20 h-20 object-cover mx-auto rounded-lg"
                      />
                    </td>
                    <td className="px-4 py-2 border">{product.title}</td>
                    <td className="px-4 py-2 border">{product.description}</td>
                    <td className="px-4 py-2 border">${product.price}</td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                      >
                        Edit / Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden grid grid-cols-1 gap-6">
            {products.map((product) => (
              <div key={product._id} className="border rounded-lg p-4 shadow relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h2 className="font-semibold text-lg">{product.title}</h2>
                <p className="text-gray-500 text-sm">{product.description}</p>
                <p className="font-bold mt-2">${product.price}</p>
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg"
                >
                  Edit / Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 relative w-full max-w-md">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X size={24} />
            </button>
            <ProductUpdateForm
              product={selectedProduct}
              onUpdated={() => {
                setSelectedProduct(null);
                fetchProducts();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
