import Link from "next/link";
import clientPromise from "@/lib/mongodb";
export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { handle } = params;

  const client = await clientPromise;
  const db = client.db("bittree");
  const collection = db.collection("links");

  const item = await collection.findOne({ handle });

  if (!item) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700 flex items-center justify-center px-4 py-16">

      {/* CARD */}
      <div className="w-full max-w-md bg-white/20 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-[35px] p-10 flex flex-col items-center text-white">

        {/* PROFILE IMAGE */}
        <div className="relative">
          <img
            src={item.pic || "https://i.pravatar.cc/300"}
            alt="profile"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
          />

          <span className="absolute -bottom-2 -right-2 bg-white text-purple-600 text-[10px] px-2 py-1 rounded-full font-bold">
            LIVE
          </span>
        </div>

        {/* HANDLE */}
        <h1 className="mt-5 text-2xl font-extrabold tracking-wide">
          @{item.handle}
        </h1>

        {/* DESCRIPTION */}
        <p className="text-center text-white/80 mt-2 text-sm px-4">
          {item.desc || "No description added yet."}
        </p>

        {/* LINKS */}
        <div className="w-full mt-8 flex flex-col gap-4">

          {item.links?.map((linkItem, index) => (
            <Link
              key={index}
              href={linkItem.link}
              target="_blank"
              className="group w-full"
            >
              <div className="w-full bg-white text-purple-700 font-semibold py-4 px-5 rounded-2xl shadow-lg text-center transition-all duration-300 group-hover:scale-105 group-hover:bg-purple-100 group-hover:text-purple-900">

                {linkItem.linktext}

                <span className="block text-xs text-purple-400 mt-1 opacity-70">
                  Visit link →
                </span>

              </div>
            </Link>
          ))}

        </div>

        {/* FOOTER */}
        <div className="mt-10 text-xs text-white/70">
          Powered by BitTree 🌳
        </div>

      </div>
    </div>
  );
}