import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("jeweltine");

    const reviews = await db.collection("reviews").find({}).toArray();
    // console.log(reviews)

    return new Response(JSON.stringify(reviews), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
