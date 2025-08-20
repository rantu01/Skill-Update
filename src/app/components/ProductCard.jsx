import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-200">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />

      {/* Title & Brand */}
      <h3 className="text-xl font-semibold mb-1">{product.title}</h3>
      <p className="text-gray-500 mb-2">Brand: {product.brand}</p>

      {/* Category & Color */}
      <p className="text-gray-600 mb-2">
        Category: {product.category} | Color: {product.color}
      </p>

      {/* Available Sizes */}
      <p className="text-gray-600 mb-2">
        Sizes: {product.size.join(", ")}
      </p>

      {/* Price */}
      <p className="font-bold text-lg mb-4">${product.price}</p>

      {/* Description */}
      <p className="text-gray-700 mb-4">{product.description}</p>

      {/* Details Link */}
      <Link
        href={`/products/${product._id || product.slug || product.title}`}
        className="text-blue-500 hover:underline font-medium"
      >
        Details
      </Link>
    </div>
  );
}
