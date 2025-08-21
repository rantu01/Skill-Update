"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { 
  Grid, 
  List, 
  Search, 
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const PRODUCTS_PER_PAGE = 4;

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, Infinity]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = ["Electronics", "Clothing", "Home", "Books", "Sports"];

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        const max = Math.max(...data.map(p => p.price), 1000);
        setPriceRange([0, max]);
        setMaxPrice(max);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredProducts = products
    .filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(product => 
      selectedCategories.length === 0 || selectedCategories.includes(product.category)
    )
    .filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .sort((a, b) => {
      switch(sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.title.localeCompare(b.title);
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

  // Reset page to 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategories, priceRange, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setPriceRange([0, maxPrice]);
    setSortBy("default");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded-full w-48 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 shadow-md">
                <div className="bg-gray-200 h-60 rounded-xl mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded mb-3 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded mb-2 w-3/4 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded mb-4 w-1/2 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-[#FCC61D] text-[#3338A0] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <span>Premium Collection</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Products
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of high-quality products, carefully selected for your satisfaction.
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3338A0] focus:border-transparent"
            />
          </div>

          {/* Sort and View */}
          <div className="flex gap-4">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-[#3338A0] focus:border-transparent"
              >
                <option value="default">Sort by</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
                <option value="newest">Newest</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>

            

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-[#3338A0] text-white px-4 py-3 rounded-xl hover:bg-[#2a2e85] transition-colors"
            >
              <SlidersHorizontal size={20} />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-xl p-6 mb-8 shadow-md border border-gray-200"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg">Filters</h3>
                <div className="flex gap-3">
                  <button
                    onClick={clearFilters}
                    className="text-sm text-[#3338A0] hover:underline"
                  >
                    Clear all
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Categories */}
                <div>
                  <h4 className="font-medium mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="rounded text-[#3338A0] focus:ring-[#3338A0]"
                        />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-full p-2 border border-gray-200 rounded-lg"
                        placeholder="Min"
                      />
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full p-2 border border-gray-200 rounded-lg"
                        placeholder="Max"
                      />
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={maxPrice}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {paginatedProducts.length} of {filteredProducts.length} products
          </p>
          {selectedCategories.length > 0 && (
            <div className="flex gap-2">
              {selectedCategories.map(category => (
                <span
                  key={category}
                  className="bg-[#FCC61D] text-[#3338A0] px-3 py-1 rounded-full text-sm font-medium"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Products Grid */}
        {paginatedProducts.length > 0 ? (
          <div className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"}`}>
            <AnimatePresence>
              {paginatedProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={clearFilters}
              className="bg-[#3338A0] text-white px-6 py-3 rounded-lg hover:bg-[#2a2e85] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                  currentPage === page
                    ? "bg-[#3338A0] text-white"
                    : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}