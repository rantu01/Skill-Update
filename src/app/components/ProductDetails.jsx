"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  Check,
  Truck,
  Shield,
  RotateCcw,
  Plus,
  Minus
} from "lucide-react";

export default function ProductDetails({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.size[0]);
  const [selectedColor, setSelectedColor] = useState(product.color);

  // Mock multiple images for gallery
  const productImages = [
    product.image,
    product.image, // In real app, these would be different images
    product.image,
    product.image,
  ];

  // Generate random rating between 4.0 and 5.0
  const rating = (4 + Math.random() * 1).toFixed(1);
  const reviewCount = Math.floor(Math.random() * 100) + 15;

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
            <motion.img
              key={selectedImage}
              src={productImages[selectedImage]}
              alt={product.title}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              <ChevronRight size={24} />
            </button>

            {/* Favorite Button */}
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              <Heart 
                size={20} 
                className={isLiked ? "text-red-500 fill-current" : "text-gray-600"} 
              />
            </button>
          </div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-4 gap-3">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index 
                    ? "border-[#3338A0] ring-2 ring-[#3338A0]/20" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.title} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500">
            Home / {product.category} / {product.brand}
          </nav>

          {/* Title & Brand */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            <p className="text-lg text-[#C59560] font-medium">By {product.brand}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  className={i < Math.floor(rating) ? "text-[#FCC61D] fill-current" : "text-gray-300"} 
                />
              ))}
            </div>
            <span className="text-gray-600">
              {rating} ({reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-[#3338A0]">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xl text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
            {product.discount && (
              <span className="bg-[#FCC61D] text-[#3338A0] px-3 py-1 rounded-full text-sm font-bold">
                Save {product.discount}%
              </span>
            )}
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Color: {selectedColor}</h3>
            <div className="flex gap-2">
              {[product.color, "Black", "White", "Blue"].map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    selectedColor === color 
                      ? "border-[#3338A0] ring-2 ring-[#3338A0]/20" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  aria-label={color}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.size.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    selectedSize === size
                      ? "border-[#3338A0] bg-[#3338A0] text-white"
                      : "border-gray-200 hover:border-gray-300 text-gray-700"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quantity</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button
                  onClick={decreaseQuantity}
                  className="p-3 hover:bg-gray-50 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 text-lg font-medium">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="p-3 hover:bg-gray-50 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              <span className="text-sm text-gray-500">{product.stock} available in stock</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-[#3338A0] text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#2a2e85] transition-colors"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-4 border-2 border-[#3338A0] text-[#3338A0] rounded-xl font-semibold hover:bg-[#3338A0] hover:text-white transition-colors"
            >
              Buy Now
            </motion.button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <Truck size={20} className="text-[#C59560]" />
              <div>
                <p className="font-medium">Free Shipping</p>
                <p className="text-sm text-gray-500">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw size={20} className="text-[#C59560]" />
              <div>
                <p className="font-medium">Easy Returns</p>
                <p className="text-sm text-gray-500">30 days return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-[#C59560]" />
              <div>
                <p className="font-medium">Secure Payment</p>
                <p className="text-sm text-gray-500">Safe and encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-16 border-t border-gray-200 pt-12">
        <h2 className="text-2xl font-bold mb-6">Product Description</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
          
          {/* Features list */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Premium quality materials",
              "Designed for comfort and durability",
              "Easy to clean and maintain",
              "Eco-friendly manufacturing process"
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-[#FCC61D] rounded-full flex items-center justify-center">
                  <Check size={12} className="text-white" />
                </div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}