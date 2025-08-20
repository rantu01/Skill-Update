import clientPromise from "../../lib/mongodb";


export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("myshop"); // database name
    const products = await db.collection("products").find({}).toArray();

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), { status: 500 });
  }
}
