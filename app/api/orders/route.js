import clientPromise from "@/lib/mongodb";
import { validateOrder } from "@/lib/schemas/orderSchema";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("jeweltine");

    const users = await db.collection("orders").find({}).toArray();
    // console.log(users)

    return new Response(JSON.stringify(users), {
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

export async function POST(req) {
  try {
    const body = await req.json();

    // const order = validateOrder(body);

    // Attach the images folder URL

    const client = await clientPromise;
    const db = client.db("jeweltine");

    const result = await db.collection("orders").insertOne(body);

    return new Response(
      JSON.stringify({
        message: "Order placed successfully",
        orderId: result.insertedId,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing order:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(req) {
  try {
    const body = await req.json();

    const { email } = body;
    if (!email) {
      throw new Error("Missing email in request");
    }

    const client = await clientPromise;
    const db = client.db("jeweltine");

    // Attempt to delete the record matching the email
    const result = await db
      .collection("ca")
      .deleteOne({ "customer.email": email });

    if (result.deletedCount === 0) {
      throw new Error("No record found for the provided email");
    }

    return new Response(
      JSON.stringify({
        message: "Record deleted successfully",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting record:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// export async function PATCH(req) {
//   try {
//     // Parse request body
//     const body = await req.json();
//     const { orderId, completed } = body;

//     // Validate input
//     if (!orderId) {
//       throw new Error("Missing order ID");
//     }
//     if (typeof completed !== "boolean") {
//       throw new Error("Invalid or missing 'completed' status");
//     }

//     // Connect to the database
//     const client = await clientPromise;
//     const db = client.db("jeweltine");

//     // Update the order
//     const result = await db.collection("orders").updateOne(
//       { _id: new ObjectId(orderId) },
//       { $set: { completed } }
//     );

//     // Check if the order was updated
//     if (result.matchedCount === 0) {
//       throw new Error("Order not found");
//     }

//     // Respond with success
//     return new Response(
//       JSON.stringify({ message: "Order updated successfully" }),
//       { status: 200, headers: { "Content-Type": "application/json" } }
//     );
//   } catch (error) {
//     console.error("Error updating order:", error);

//     // Respond with an error
//     return new Response(
//       JSON.stringify({ error: error.message }),
//       { status: 400, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }

export async function PATCH(req) {
  try {
    // Parse request body
    const body = await req.json();
    const { orderId, completed } = body;

    // Validate input
    if (!orderId) {
      throw new Error("Missing order ID");
    }
    if (typeof completed !== "boolean") {
      throw new Error("Invalid or missing 'completed' status");
    }

    // Connect to the database
    const client = await clientPromise;
    const db = client.db("jeweltine");

    // Update the order
    const result = await db
      .collection("orders")
      .updateOne({ _id: new ObjectId(orderId) }, { $set: { completed } });

    // Check if the order was updated
    if (result.matchedCount === 0) {
      throw new Error("Order not found");
    }

    // Respond with success
    return new Response(
      JSON.stringify({ message: "Order updated successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating order:", error);

    // Respond with an error
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
