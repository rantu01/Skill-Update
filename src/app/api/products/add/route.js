import clientPromise from "../../../lib/mongodb";

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, brand, category, color, size, image, description, price } = body;

    // Validate required fields
    if (!title || !brand || !category || !color || !size || !image || !description || !price) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("myshop");

    const result = await db.collection("products").insertOne({
      title,
      brand,
      category,
      color,
      size: Array.isArray(size) ? size : size.split(",").map(s => s.trim()), // ensure array
      image,
      description,
      price: parseFloat(price),
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ message: "Product added", productId: result.insertedId }),
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/products/add error:", error);
    return new Response(JSON.stringify({ error: "Failed to add product" }), { status: 500 });
  }
}
