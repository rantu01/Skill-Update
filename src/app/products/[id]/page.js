export default function ProductDetailsPage({ params }) {
  const { id } = params;

  return (
    <div>
      <h1>Product Details Page</h1>
      <p>Details for product ID: {id}</p>
    </div>
  );
}
