"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Facebook, 
  Github, 
  Twitter,
  Loader2,
  Sparkles,
  Shield,
  CheckCircle
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: ""
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    await signIn(provider, { callbackUrl: "/products" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Handle form submission here
    setTimeout(() => setIsLoading(false), 2000);
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3338A0] to-[#2a2e85]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-2xl shadow-xl text-center"
        >
          <Loader2 className="w-8 h-8 animate-spin text-[#3338A0] mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </motion.div>
      </div>
    );
  }

  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3338A0] to-[#2a2e85] p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-[#FCC61D] to-[#C59560] rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {session.user.name}! 👋
          </h1>
          <p className="text-gray-600 mb-6">
            You are successfully signed in to your account.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600">
              Signed in as: <span className="font-medium">{session.user.email}</span>
            </p>
          </div>
          <div className="space-y-3">
            <Link
              href="/products"
              className="block w-full bg-[#3338A0] text-white py-3 rounded-lg font-semibold hover:bg-[#2a2e85] transition-colors"
            >
              Continue Shopping
            </Link>
            <button
              onClick={() => signOut()}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3338A0] to-[#2a2e85] p-4">
      <div className="max-w-4xl w-full grid md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left Side - Illustration/Info */}
        <div className="hidden md:block bg-gradient-to-br from-[#2a2e85] to-[#1a1f5c] p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 bg-[#FCC61D] rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 bg-[#C59560] rounded-full"></div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative z-10"
          >
            <h2 className="text-3xl font-bold mb-6">Welcome to MyShop</h2>
            <p className="text-gray-200 mb-8">
              Sign in to access exclusive features, track your orders, and enjoy a personalized shopping experience.
            </p>

            
            
            <div className="space-y-4">
              {[
                { icon: Shield, text: "Secure & encrypted authentication" },
                { icon: Sparkles, text: "Personalized recommendations" },
                { icon: CheckCircle, text: "Fast checkout process" }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-[#FCC61D]" />
                    <span className="text-gray-200">{item.text}</span>
                  </div>
                );
              })}
            </div>
            <p className="text-4xl p-6">
              use only google social login, <br /> other login option will added latter 
            </p>
          </motion.div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-8 md:p-12">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-[#3338A0] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900">MyShop</span>
            </Link>
            
            <div className="flex border border-gray-200 rounded-lg p-1 mb-6 max-w-xs mx-auto">
              <button
                onClick={() => setActiveTab("login")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "login" 
                    ? "bg-[#3338A0] text-white" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab("register")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "register" 
                    ? "bg-[#3338A0] text-white" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Register
              </button>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {activeTab === "login" ? "Welcome back" : "Create account"}
            </h1>
            <p className="text-gray-600">
              {activeTab === "login" 
                ? "Sign in to continue to your account" 
                : "Join us for exclusive benefits"
              }
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {activeTab === "register" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3338A0] focus:border-transparent"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3338A0] focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3338A0] focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {activeTab === "register" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3338A0] focus:border-transparent"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>
              )}

              {activeTab === "login" && (
                <div className="flex justify-between items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-[#3338A0] focus:ring-[#3338A0]"
                    />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <Link href="/forgot-password" className="text-sm text-[#3338A0] hover:underline">
                    Forgot password?
                  </Link>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#3338A0] text-white py-3 rounded-lg font-semibold hover:bg-[#2a2e85] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                {activeTab === "login" ? "Sign In" : "Create Account"}
              </button>
            </motion.form>
          </AnimatePresence>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {[
              { provider: "google", label: "Google", color: "bg-red-500 hover:bg-red-600" }
            ].map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.button
                  key={index}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSocialLogin(social.provider)}
                  disabled={isLoading}
                  className={`${social.color} text-white py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {social.label}
                </motion.button>
              );
            })}
          </div>

          <p className="text-center text-gray-600 mt-8 text-sm">
            {activeTab === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === "login" ? "register" : "login")}
              className="text-[#3338A0] hover:underline font-medium"
            >
              {activeTab === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}