import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // query param এ id নিতে পারো
    if (!id) {
      return new Response(JSON.stringify({ error: "Missing id" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("myshop");
    const product = await db.collection("products").findOne({ _id: new ObjectId(id) });

    if (!product) {
      return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch product" }), { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const { name, description, price } = await req.json();

    if (!id || !name || !description || !price)
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });

    const client = await clientPromise;
    const db = client.db("myshop");

    await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, description, price: parseFloat(price) } }
    );

    return new Response(JSON.stringify({ message: "Product updated" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update product" }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return new Response(JSON.stringify({ error: "Missing id" }), { status: 400 });

    const client = await clientPromise;
    const db = client.db("myshop");

    await db.collection("products").deleteOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify({ message: "Product deleted" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete product" }), { status: 500 });
  }
}
