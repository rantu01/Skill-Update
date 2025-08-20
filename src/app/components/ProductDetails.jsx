export default function ProductDetails({ product }) {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow mt-10">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-96 object-cover rounded-lg mb-6"
      />

      {/* Title & Brand */}
      <h2 className="text-3xl font-bold mb-2">{product.title}</h2>
      <p className="text-gray-500 mb-4">Brand: {product.brand}</p>

      {/* Category & Color */}
      <p className="text-gray-600 mb-2">
        Category: {product.category} | Color: {product.color}
      </p>

      {/* Sizes */}
      <p className="text-gray-600 mb-4">
        Available Sizes: {product.size.join(", ")}
      </p>

      {/* Price */}
      <p className="text-xl font-semibold mb-4">Price: ${product.price}</p>

      {/* Description */}
      <p className="text-gray-700 mb-4">{product.description}</p>
    </div>
  );
}
 