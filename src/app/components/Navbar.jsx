import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">MyShop</h1>
      <div className="space-x-4">
        <Link href="/" className="hover:text-gray-300">Home</Link>
        <Link href="/products" className="hover:text-gray-300">Products</Link>
        <Link href="/login" className="hover:text-gray-300">Login</Link>
      </div>
    </nav>
  );
}
