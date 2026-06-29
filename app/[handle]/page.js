// import Link from "next/link";
// import clientPromise from "@/lib/mongodb";
// import { notFound } from "next/navigation";

// export default async function Page({ params }) {
//   const handle = params.handle;

//   const client = await clientPromise;
//   const db = client.db("bittree");
//   const collection = db.collection("links");

//   // 🔥 SAFE QUERY
//   const item = await collection.findOne({ handle });

//   // ❌ ONLY return 404 if truly nothing found
//   if (!item) {
//     console.log("NO DATA FOUND FOR:", handle);
//     return notFound();
//   }

//   console.log("FOUND ITEM:", item);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700 flex items-center justify-center px-4 py-16">

//       <div className="w-full max-w-md bg-white/20 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-[35px] p-10 flex flex-col items-center text-white">

//         {/* IMAGE */}
//         <img
//           src={item.pic || "https://i.pravatar.cc/300"}
//           alt="profile"
//           className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
//         />

//         {/* HANDLE */}
//         <h1 className="mt-5 text-2xl font-extrabold">
//           @{item.handle}
//         </h1>

//         {/* DESC */}
//         <p className="text-center text-white/80 mt-2 text-sm px-4">
//           {item.desc || "No description added yet."}
//         </p>

//         {/* LINKS */}
//         <div className="w-full mt-8 flex flex-col gap-4">
//           {item.links && item.links.length > 0 ? (
//             item.links.map((linkItem, index) => (
//               <Link
//                 key={index}
//                 href={linkItem.link}
//                 target="_blank"
//                 className="w-full"
//               >
//                 <div className="w-full bg-white text-purple-700 font-semibold py-4 px-5 rounded-2xl text-center">
//                   {linkItem.linktext}
//                 </div>
//               </Link>
//             ))
//           ) : (
//             <p className="text-white/70 text-sm text-center">
//               No links available
//             </p>
//           )}
//         </div>

//         {/* FOOTER */}
//         <div className="mt-10 text-xs text-white/70">
//           Powered by BitTree 🌳
//         </div>

//       </div>
//     </div>
//   );
// }

















import Link from "next/link";
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const handle = params.handle;

  const client = await clientPromise;
  const db = client.db("bittree");
  const collection = db.collection("links");

  const item = await collection.findOne({ handle });

  if (!item) {
    console.log("NO DATA FOUND FOR:", handle);
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5B21B6] via-[#7C3AED] to-[#4C1D95] flex items-center justify-center px-4 py-16">

      <div className="w-full max-w-md bg-white/15 backdrop-blur-3xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.35)] rounded-[36px] p-10 flex flex-col items-center text-white transition-all duration-500">

        {/* Profile Image */}
        <div className="relative">
          <img
            src={item.pic || "https://i.pravatar.cc/300"}
            alt="profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-2xl object-cover transition-all duration-500 hover:scale-110 hover:rotate-2"
          />

          <span className="absolute -bottom-2 -right-2 bg-white text-black text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
            LIVE
          </span>
        </div>

        {/* Handle */}
        <h1 className="mt-6 text-3xl font-extrabold tracking-wide">
          @{item.handle}
        </h1>

        {/* Description */}
        <p className="text-center text-white/90 mt-4 text-base leading-7 font-medium px-4">
          {item.desc || "No description added yet."}
        </p>

        {/* Links */}
        <div className="w-full mt-8 flex flex-col gap-5">

          {item.links && item.links.length > 0 ? (

            item.links.map((linkItem, index) => (

              <Link
                key={index}
                href={linkItem.link}
                target="_blank"
                className="group"
              >

                <div
                  className="
                    w-full
                    bg-white
                    text-black
                    font-semibold
                    py-4
                    px-5
                    rounded-2xl
                    text-center
                    shadow-lg
                    transition-all
                    duration-300
                    ease-in-out
                    hover:-translate-y-1
                    hover:scale-[1.03]
                    hover:bg-gray-100
                    hover:shadow-2xl
                    active:scale-95
                  "
                >
                  <div className="text-base">
                    {linkItem.linktext}
                  </div>

                  <div className="text-xs text-gray-500 mt-1">
                    Click to Visit →
                  </div>
                </div>

              </Link>

            ))

          ) : (

            <p className="text-white/80 text-center">
              No links available.
            </p>

          )}

        </div>

        {/* Footer */}

        <div className="mt-10 text-base font-semibold text-black tracking-wide">
          Powered by BitTree 🌳
        </div>

      </div>

    </div>
  );
}