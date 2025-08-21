"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  ShoppingBag,
  LayoutDashboard,
  LogIn,
  LogOut,
  User,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/products", label: "Products", icon: ShoppingBag },
  ];

  return (
    <nav className="bg-[#3338A0] text-white px-6 py-4 shadow-lg sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <motion.div
            className="w-10 h-10 bg-[#FCC61D] rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-[#3338A0] font-bold text-lg">M</span>
          </motion.div>
          <h1 className="text-xl font-bold group-hover:text-[#FCC61D] transition-colors">
            MyShop
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const IconComponent = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 rounded-lg flex items-center space-x-1 transition-all ${
                  isActive
                    ? "text-[#FCC61D] font-semibold"
                    : "hover:bg-[#2a2e85]"
                }`}
              >
                <IconComponent size={18} />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FCC61D]"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
              </Link>
            );
          })}

          {/* User Section */}
          <div className="relative" ref={dropdownRef}>
            {session ? (
              <>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-[#2a2e85] transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#C59560] flex items-center justify-center">
                    <User size={16} />
                  </div>
                  <span className="max-w-[120px] truncate">
                    {session.user?.name || session.user?.email}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20"
                  >
                    <Link
                      href="/dashboard"
                      className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <LayoutDashboard size={16} className="mr-2" />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </>
            ) : (
              <Link
                href="/login"
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all ${
                  pathname === "/login"
                    ? "text-[#FCC61D] font-semibold"
                    : "hover:bg-[#2a2e85]"
                }`}
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md hover:bg-[#2a2e85] transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-[#3338A0] text-white w-full mt-2 shadow-lg rounded-lg py-4 px-4 flex flex-col gap-2"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const IconComponent = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                  isActive ? "text-[#FCC61D] font-semibold" : "hover:bg-[#2a2e85]"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <IconComponent size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* User Section */}
          {session ? (
            <div className="flex flex-col gap-1 mt-2 border-t border-[#2a2e85] pt-2">
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 px-3 py-2 hover:bg-[#2a2e85] rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={() => signOut()}
                className="flex items-center space-x-2 px-3 py-2 hover:bg-[#2a2e85] rounded-lg"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-[#2a2e85]`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LogIn size={16} />
              <span>Login</span>
            </Link>
          )}
        </motion.div>
      )}
    </nav>
  );
}
