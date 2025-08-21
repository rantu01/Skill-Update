export default function FAQs() {
  return (
    <div className="p-10 max-w-4xl mx-auto bg-white shadow-md rounded-2xl my-30">
      <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-lg">How long does shipping take?</h2>
          <p className="text-gray-600">
            Typically 3–5 business days depending on your location.
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-lg">Can I return a product?</h2>
          <p className="text-gray-600">
            Yes, you can return items within 7 days of purchase if they are unused and in original condition.
          </p>
        </div>
      </div>
    </div>
  );
}