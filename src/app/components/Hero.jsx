import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex-1 flex flex-col justify-center items-center text-center py-20 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        Welcome to MyShop 🚀
      </h2>
      <p className="text-lg mb-6">
        Find the best products at the best prices.
      </p>
      <Link
        href="/products"
        className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-gray-200"
      >
        Explore Products
      </Link>
    </section>
  );
}
