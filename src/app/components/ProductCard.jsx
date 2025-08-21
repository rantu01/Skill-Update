"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Eye,
  Zap
} from "lucide-react";
import { useState } from "react";

export default function   ProductCard({ product }) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Generate random rating between 4.0 and 5.0
  const rating = (4 + Math.random() * 1).toFixed(1);
  const reviewCount = Math.floor(Math.random() * 100) + 15;

  // Handle image hover for product image switching
  const handleImageHover = () => {
    // If product has multiple images, switch to second image on hover
    if (product.images && product.images.length > 1) {
      setCurrentImageIndex(1);
    }
  };

  const handleImageLeave = () => {
    setCurrentImageIndex(0);
  };

  // Determine which image to show
  const getImageSource = () => {
    if (product.images && product.images.length > 0) {
      return product.images[currentImageIndex];
    }
    return product.image || "/api/placeholder/300/300";
  };

  return (
    <motion.div 
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Container */}
      <div 
        className="relative overflow-hidden h-72"
        onMouseEnter={handleImageHover}
        onMouseLeave={handleImageLeave}
      >
        {/* Product Image */}
        <img
          src={getImageSource()}
          alt={product.title || product.name}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-400 text-2xl font-bold">
              {product.title ? product.title[0] : product.name ? product.name[0] : "P"}
            </div>
          </div>
        )}
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-[#FCC61D] text-[#3338A0] text-xs font-bold px-2 py-1 rounded-full">
              NEW
            </span>
          )}
          {(product.discount > 0 || product.discountPercentage > 0) && (
            <span className="bg-[#C59560] text-white text-xs font-bold px-2 py-1 rounded-full">
              -{product.discount || product.discountPercentage}%
            </span>
          )}
        </div>
        
        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          
          <Link 
            href={`/products/${product._id || product.id || product.slug || product.title}`}
            className="bg-white p-2 rounded-full shadow-md hover:bg-blue-50 transition-colors"
            aria-label="View product details"
          >
            <Eye size={18} className="text-gray-600" />
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        {/* Category */}
        <p className="text-[#C59560] text-sm font-medium uppercase tracking-wide mb-1">
          {product.category || "Uncategorized"}
        </p>
        
        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-[#3338A0] transition-colors">
          {product.title || product.name}
        </h3>
        
        
        {/* Available Sizes */}
        {product.size && product.size.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-gray-500">Sizes:</span>
            <div className="flex gap-1">
              {product.size.slice(0, 4).map((size, index) => (
                <span 
                  key={index} 
                  className="text-xs bg-gray-100 px-2 py-1 rounded"
                >
                  {size}
                </span>
              ))}
              {product.size.length > 4 && (
                <span className="text-xs text-gray-500">+{product.size.length - 4} more</span>
              )}
            </div>
          </div>
        )}
        
        {/* Price Section */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xl font-bold text-[#3338A0]">
              ${product.price}
            </span>
            {(product.originalPrice || product.compareAtPrice) && (
              <span className="text-sm text-gray-400 line-through ml-2">
                ${product.originalPrice || product.compareAtPrice}
              </span>
            )}
          </div>
          
          {/* Stock Status */}
          <div className="flex items-center gap-1 text-sm text-green-600">
            <Zap size={14} />
            <span>In Stock</span>
          </div>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-[#3338A0] transition-colors">
          {product.description	 || product.name}
        </h3>
        
        {/* Details Link */}
        <Link
          href={`/products/${product._id || product.id || product.slug || product.title}`}
          className="flex items-center justify-center gap-2 text-[#3338A0] font-medium py-2 px-4 rounded-lg border border-[#3338A0] hover:bg-[#3338A0] hover:text-white transition-colors duration-200 group/link"
        >
          <span>View Details</span>
          <motion.span 
            className="group-hover/link:translate-x-1 transition-transform"
            initial={{ x: 0 }}
            whileHover={{ x: 3 }}
          >
            →
          </motion.span>
        </Link>
      </div>
    </motion.div>
  );
}