import Link from "next/link";
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const handle = params.handle;

  const client = await clientPromise;
  const db = client.db("bittree");
  const collection = db.collection("links");

  // 🔥 SAFE QUERY
  const item = await collection.findOne({ handle });

  // ❌ ONLY return 404 if truly nothing found
  if (!item) {
    console.log("NO DATA FOUND FOR:", handle);
    return notFound();
  }

  console.log("FOUND ITEM:", item);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700 flex items-center justify-center px-4 py-16">

      <div className="w-full max-w-md bg-white/20 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-[35px] p-10 flex flex-col items-center text-white">

        {/* IMAGE */}
        <img
          src={item.pic || "https://i.pravatar.cc/300"}
          alt="profile"
          className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
        />

        {/* HANDLE */}
        <h1 className="mt-5 text-2xl font-extrabold">
          @{item.handle}
        </h1>

        {/* DESC */}
        <p className="text-center text-white/80 mt-2 text-sm px-4">
          {item.desc || "No description added yet."}
        </p>

        {/* LINKS */}
        <div className="w-full mt-8 flex flex-col gap-4">
          {item.links && item.links.length > 0 ? (
            item.links.map((linkItem, index) => (
              <Link
                key={index}
                href={linkItem.link}
                target="_blank"
                className="w-full"
              >
                <div className="w-full bg-white text-purple-700 font-semibold py-4 px-5 rounded-2xl text-center">
                  {linkItem.linktext}
                </div>
              </Link>
            ))
          ) : (
            <p className="text-white/70 text-sm text-center">
              No links available
            </p>
          )}
        </div>

        {/* FOOTER */}
        <div className="mt-10 text-xs text-white/70">
          Powered by BitTree 🌳
        </div>

      </div>
    </div>
  );
}