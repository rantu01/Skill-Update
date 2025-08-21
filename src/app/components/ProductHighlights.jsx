"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  ShoppingCart, 
  Eye, 
  Heart, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function ProductHighlights() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data.slice(0, 4)); // ✅ show only 4 products
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const ProductSkeleton = () => (
    <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 overflow-hidden">
      <div className="bg-gray-200 h-60 rounded-xl mb-4 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded mb-3 animate-pulse"></div>
      <div className="h-3 bg-gray-200 rounded mb-2 w-3/4 animate-pulse"></div>
      <div className="h-3 bg-gray-200 rounded mb-4 w-1/2 animate-pulse"></div>
      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
    </div>
  );

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#FCC61D]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#3338A0]/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section heading */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-[#FCC61D] text-[#3338A0] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Sparkles size={16} />
            <span>Premium Collection</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular and highly-rated items, carefully selected for quality and value.
          </p>
        </motion.div>

        {/* Product grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence>
              {products.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 overflow-hidden group relative"
                  onMouseEnter={() => setHoveredProduct(product._id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {/* Product image */}
                  <div className="relative overflow-hidden rounded-xl mb-4 h-60 bg-gray-100 flex items-center justify-center">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.title}
                        className="object-cover h-full w-full"
                      />
                    ) : (
                      <div className="text-gray-400 text-5xl font-bold">{product.title[0]}</div>
                    )}

                    {/* Overlay actions */}
                    <motion.div 
                      className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Link href={"/products"}>
                      <button className="bg-white p-3 rounded-full shadow-md hover:bg-[#FCC61D] hover:text-white transition-colors">
                        <ShoppingCart size={18} />
                      </button>
                      </Link>
                      
                      <Link href={`/products/${product._id}`} className="bg-white p-3 rounded-full shadow-md hover:bg-[#3338A0] hover:text-white transition-colors">
                        <Eye size={18} />
                      </Link>
                    </motion.div>
                  </div>

                  {/* Product info */}
                  <div className="p-2">
                    <h4 className="font-semibold text-gray-900 mb-2 line-clamp-1">{product.title}</h4>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#3338A0] font-bold text-lg">${product.price}</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#3338A0] text-white p-2 rounded-lg hover:bg-[#2a2e85] transition-colors"
                      >
                        <ShoppingCart size={18} />
                      </motion.button>
                    </div>
                  </div>

                  {/* Hover border effect */}
                  <motion.div 
                    className="absolute inset-0 rounded-2xl border-2 border-[#FCC61D] pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProduct === product._id ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-12">
            <h4 className="text-xl font-semibold text-gray-700 mb-2">No products found</h4>
            <p className="text-gray-500 mb-6">Check back later for new arrivals</p>
          </div>
        )}

        {/* View all products button */}
        <motion.div className="text-center mt-16">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3338A0] to-[#2a2e85] text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-[#3338A0]/30 transition-all duration-300 group"
          >
            <span>View All Products</span>
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
