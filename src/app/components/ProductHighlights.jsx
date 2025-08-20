export default function ProductHighlights() {
  return (
    <section className="py-16 px-6 bg-gray-100">
      <h3 className="text-2xl font-bold text-center mb-10">
        🔥 Featured Products
      </h3>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h4 className="text-lg font-semibold mb-2">Product 1</h4>
          <p className="text-gray-600">Best quality product for you</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h4 className="text-lg font-semibold mb-2">Product 2</h4>
          <p className="text-gray-600">Top trending item right now</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h4 className="text-lg font-semibold mb-2">Product 3</h4>
          <p className="text-gray-600">Don’t miss this special deal</p>
        </div>
      </div>
    </section>
  );
}
