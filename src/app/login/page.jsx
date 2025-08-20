"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl mb-4">Welcome, {session.user.name} 👋</h1>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Login Page</h1>
      <button
        onClick={() => signIn("google", { callbackUrl: "/products" })}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Sign in with Google
      </button>
    </div>
  );
}
