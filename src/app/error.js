"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body className="h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
        <div className="text-center p-6 bg-white shadow-lg rounded-2xl max-w-md">
          <h1 className="text-5xl font-bold text-red-600 mb-4">500</h1>
          <h2 className="text-2xl font-semibold mb-2">Something went wrong!</h2>
          <p className="text-gray-600 mb-6">
            We encountered an unexpected error. Please try again later.
          </p>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
