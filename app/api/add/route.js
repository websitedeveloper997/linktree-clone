import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();

    const client = await clientPromise;
    const db = client.db("bittree");
    const collection = db.collection("links");

    const existing = await collection.findOne({ handle: body.handle });

    if (existing) {
      return Response.json({
        success: false,
        message: "Handle already exists",
      });
    }

    await collection.insertOne(body);

    return Response.json({
      success: true,
      message: "Bittree created successfully!",
    });

  } catch (error) {
    console.log(error);

    return Response.json({
      success: false,
      message: "Server error",
    });
  }
}