// // 🔥 FORCE DYNAMIC RENDER
// export const dynamic = "force-dynamic";
// export const fetchCache = "force-no-store";
// export const revalidate = 0;

// import Link from "next/link";
// import { notFound } from "next/navigation";

// export default async function Page({ params }) {
//   const { handle } = params;

//   try {
//     // ✅ BASE URL SAFE (PRODUCTION + LOCAL SUPPORT)
//     const baseUrl =
//       process.env.NEXT_PUBLIC_BASE_URL ||
//       "https://linktree-clone-m4sk.vercel.app";

//     // 🔥 FETCH API
//     const res = await fetch(
//       `${baseUrl}/api/get?handle=${handle}`,
//       {
//         cache: "no-store",
//       }
//     );

//     // ❌ API FAILED
//     if (!res.ok) {
//       console.log("API ERROR STATUS:", res.status);
//       return notFound();
//     }

//     // ✅ PARSE RESPONSE
//     const data = await res.json();
//     console.log("API RESPONSE:", data);

//     // 🔥 HANDLE DIFFERENT RESPONSE STRUCTURES SAFELY
//     const item = data?.data || data;

//     // ❌ INVALID DATA CHECK
//     if (!item || !item.handle) {
//       console.log("INVALID ITEM:", item);
//       return notFound();
//     }

//     // 🎯 UI RENDER
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700 flex items-center justify-center px-4 py-16">

//         {/* CARD */}
//         <div className="w-full max-w-md bg-white/20 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-[35px] p-10 flex flex-col items-center text-white">

//           {/* PROFILE IMAGE */}
//           <div className="relative">
//             <img
//               src={item.pic || "https://i.pravatar.cc/300"}
//               alt="profile"
//               className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
//             />
//             <span className="absolute -bottom-2 -right-2 bg-white text-purple-600 text-[10px] px-2 py-1 rounded-full font-bold">
//               LIVE
//             </span>
//           </div>

//           {/* HANDLE */}
//           <h1 className="mt-5 text-2xl font-extrabold tracking-wide">
//             @{item.handle}
//           </h1>

//           {/* DESCRIPTION */}
//           <p className="text-center text-white/80 mt-2 text-sm px-4">
//             {item.desc || "No description added yet."}
//           </p>

//           {/* LINKS */}
//           <div className="w-full mt-8 flex flex-col gap-4">
//             {item.links?.length > 0 ? (
//               item.links.map((linkItem, index) => (
//                 <Link
//                   key={index}
//                   href={linkItem.link}
//                   target="_blank"
//                   className="group w-full"
//                 >
//                   <div className="w-full bg-white text-purple-700 font-semibold py-4 px-5 rounded-2xl shadow-lg text-center transition-all duration-300 group-hover:scale-105 group-hover:bg-purple-100 group-hover:text-purple-900">
//                     {linkItem.linktext}
//                     <span className="block text-xs text-purple-400 mt-1 opacity-70">
//                       Visit link →
//                     </span>
//                   </div>
//                 </Link>
//               ))
//             ) : (
//               <p className="text-white/70 text-sm text-center">
//                 No links available
//               </p>
//             )}
//           </div>

//           {/* FOOTER */}
//           <div className="mt-10 text-xs text-white/70">
//             Powered by BitTree 🌳
//           </div>

//         </div>
//       </div>
//     );
// }




















import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation";

export default async function Page({ params }) {
    const handle = (await params).handle
    const client = await clientPromise;
    const db = client.db("bittree")
    const collection = db.collection("links")

    // If the handle is already claimed, you cannot create the bittree
    const item = await collection.findOne({handle: handle})
    if(!item){
        return notFound()
    }

    console.log(item)

    const item2 = {
        "_id": {
            "$oid": "6729e97390cf30c8f66c4c68"
        },
        "links": [
            {
                "link": "https://www.instagram.com/codewithharry/?hl=en",
                "linktext": "Instagram"
            },
            {
                "link": "https://www.codewithharry.com",
                "linktext": "Website"
            },
            {
                "link": "https://www.YouTube.com/codewithharry/?hl=en",
                "linktext": "YouTube"
            }
        ],
        "handle": "harry",
        "pic": "https://avatars.githubusercontent.com/u/48705673?v=4"
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
            {item.links?.length > 0 ? (
              item.links.map((linkItem, index) => (
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
    )