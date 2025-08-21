"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart,
  ArrowUp,
  CreditCard,
  Shield,
  Truck,
  MessageCircle
} from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribed with:", email);
    setEmail("");
    alert("Thank you for subscribing to our newsletter!");
  };

  const footerSections = [
    {
      title: "Shop",
      links: [
        { name: "New Arrivals", href: "/new-arrivals" },
        { name: "Best Sellers", href: "/best-sellers" },
        { name: "Sale", href: "/sale" },
        { name: "Collections", href: "/collections" },
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "FAQs", href: "/faqs" },
        { name: "Shipping Info", href: "/shipping" },
        { name: "Returns", href: "/returns" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/rantu.0066/", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const paymentMethods = [
    "Visa", "Mastercard", "PayPal", "Apple Pay", "Google Pay"
  ];

  return (
    <footer className="bg-gradient-to-b from-[#1a1f5c] to-[#3338A0] text-white">
      {/* Newsletter Section */}
      {/* <div className="bg-[#2a2e85] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
            <p className="text-gray-300">Subscribe to our newsletter for exclusive deals and new arrivals</p>
          </div>
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FCC61D] focus:border-transparent text-gray-900"
              required
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#FCC61D] text-[#3338A0] px-6 py-3 rounded-lg font-semibold hover:bg-[#e6b220] transition-colors"
            >
              Subscribe
            </motion.button>
          </form>
        </div>
      </div> */}

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#FCC61D] rounded-lg flex items-center justify-center">
                <span className="text-[#3338A0] font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold">MyShop</span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Your trusted destination for quality products at amazing prices. We're committed to providing exceptional shopping experiences.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ y: -2 }}
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#FCC61D] hover:text-[#3338A0] transition-colors"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold text-lg mb-4 text-[#FCC61D]">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href} 
                      className="text-gray-300 hover:text-[#FCC61D] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FCC61D] rounded-lg flex items-center justify-center">
              <Phone size={18} className="text-[#3338A0]" />
            </div>
            <div>
              <p className="font-semibold">Customer Support</p>
              <p className="text-gray-300">+880 1316034237</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FCC61D] rounded-lg flex items-center justify-center">
              <Mail size={18} className="text-[#3338A0]" />
            </div>
            <div>
              <p className="font-semibold">Email Us</p>
              <p className="text-gray-300">rantumondal06@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FCC61D] rounded-lg flex items-center justify-center">
              <MapPin size={18} className="text-[#3338A0]" />
            </div>
            <div>
              <p className="font-semibold">Location</p>
              <p className="text-gray-300">123 bagmara, khulna, Bangladesh</p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/20">
          <div className="flex items-center gap-3">
            <Shield size={24} className="text-[#FCC61D]" />
            <div>
              <p className="font-semibold">Secure Payment</p>
              <p className="text-gray-300 text-sm">Your data is protected</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Truck size={24} className="text-[#FCC61D]" />
            <div>
              <p className="font-semibold">Free Shipping</p>
              <p className="text-gray-300 text-sm">On orders over $50</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MessageCircle size={24} className="text-[#FCC61D]" />
            <div>
              <p className="font-semibold">24/7 Support</p>
              <p className="text-gray-300 text-sm">We're here to help</p>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-8 pt-8 border-t border-white/20">
          <h5 className="font-semibold mb-4 text-center">We Accept</h5>
          <div className="flex flex-wrap justify-center gap-4">
            {paymentMethods.map((method, index) => (
              <div key={index} className="bg-white/10 px-4 py-2 rounded-lg">
                <span className="text-sm">{method}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#1a1f5c] py-6 relative">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm flex items-center gap-1">
            © {new Date().getFullYear()} MyShop. Made with <Heart size={14} className="text-red-500 fill-current" /> by Rantu Mondal
          </p>
          
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-300 hover:text-[#FCC61D] text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-300 hover:text-[#FCC61D] text-sm transition-colors">
              Terms of Service
            </Link>
          </div>

          {/* Scroll to Top Button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            className="fixed bottom-6 right-6 md:relative md:bottom-0 md:right-0 w-12 h-12 bg-[#FCC61D] rounded-full flex items-center justify-center shadow-lg hover:bg-[#e6b220] transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} className="text-[#3338A0]" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}