"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Sparkles, 
  ShoppingBag, 
  Star, 
  Shield,
  Truck 
} from "lucide-react";

export default function Hero() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center py-20 px-4 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3338A0] via-[#2a2e85] to-[#1f2259] z-0"></div>
      
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-20 left-10 w-20 h-20 rounded-full bg-[#FCC61D]/20 blur-xl"
        animate={floatingAnimation}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-[#C59560]/30 blur-xl"
        animate={{
          ...floatingAnimation,
          y: [0, 15, 0],
          transition: { duration: 5, repeat: Infinity }
        }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-[#FCC61D]/10 blur-xl"
        animate={{
          ...floatingAnimation,
          y: [0, -15, 0],
          transition: { duration: 6, repeat: Infinity }
        }}
      />
      
      {/* Sparkles */}
      <motion.div
        className="absolute top-28 right-28"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles className="text-[#FCC61D]" size={24} />
      </motion.div>
      <motion.div
        className="absolute bottom-40 left-32"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles className="text-[#C59560]" size={20} />
      </motion.div>
      
      {/* Main content */}
      <motion.div 
        className="relative z-10 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <motion.span 
            className="inline-block px-4 py-1 bg-[#FCC61D] text-[#3338A0] rounded-full text-sm font-semibold mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            🚀 Premium Shopping Experience
          </motion.span>
        </motion.div>
        
        <motion.h2 
          variants={itemVariants}
          className="text-4xl md:text-6xl font-bold mb-6 text-white"
        >
          Discover Amazing{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FCC61D] to-[#C59560]">
            Products
          </span>{" "}
          at MyShop
        </motion.h2>
        
        <motion.p 
          variants={itemVariants}
          className="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto"
        >
          Find the best products at unbeatable prices with fast delivery and exceptional customer service.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/products"
            className="px-8 py-4 bg-gradient-to-r from-[#FCC61D] to-[#C59560] text-gray-900 font-bold rounded-full flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#FCC61D]/30 transition-all duration-300 group"
          >
            <span>Explore Products</span>
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            href="/about"
            className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#3338A0] transition-all duration-300"
          >
            Learn More
          </Link>
        </motion.div>
      </motion.div>
      
      {/* Feature highlights */}
      <motion.div 
        className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {[
          { icon: Star, text: "Premium Quality" },
          { icon: Shield, text: "Secure Payment" },
          { icon: Truck, text: "Fast Delivery" },
          { icon: ShoppingBag, text: "1000+ Products" }
        ].map((feature, index) => (
          <motion.div 
            key={index}
            className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10"
            whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.15)" }}
          >
            <feature.icon className="mx-auto text-[#FCC61D] mb-2" size={28} />
            <p className="text-white font-medium text-sm">{feature.text}</p>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-3 bg-[#FCC61D] rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}