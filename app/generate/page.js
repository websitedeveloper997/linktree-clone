
"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

import Image from "next/image";

// ---------------- CHILD COMPONENT (Client Component) ----------------
function GenerateContent() {
  const searchParams = useSearchParams();
  const router = useRouter();


  const [links, setLinks] = useState([{ link: "", linktext: "" }]);
  const [handle, sethandle] = useState(searchParams.get("handle") || "");
  const [pic, setpic] = useState("");
  const [desc, setdesc] = useState("");

  const handleChange = (index, link, linktext) => {
    setLinks((initialLinks) =>
      initialLinks.map((item, i) =>
        i === index ? { link, linktext } : item
      )
    );
  };

  const addLink = () => {
    setLinks(links.concat([{ link: "", linktext: "" }]));
  };

  const submitLinks = async () => {
    const raw = JSON.stringify({
      links,
      handle,
      pic,
      desc,
    });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: raw,
    };

    const r = await fetch("/api/add", requestOptions);
    const result = await r.json();

    console.log(result); // ADD THIS

    if (result.success) {
      toast.success(result.message);
      setTimeout(() => {
        router.push(`/${handle}`);
      }, 500);

      setLinks([{ link: "", linktext: "" }]);
      setpic("");
      sethandle("");
      setdesc("");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-black via-black to-black pt-44 px-4 flex justify-center">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12">
          {/* LEFT CARD */}
          <div className="bg-[#262626] backdrop-blur-xl shadow-2xl rounded-[30px] p-10 border border-white">
            <h1 className="text-4xl font-extrabold text-gray-900">
              Create Your BitTree
            </h1>
            <p className="text-gray-600 mt-2 mb-8">
              Add all your important links in one place.
            </p>

            {/* HANDLE */}
            <input
              value={handle}
              onChange={(e) => sethandle(e.target.value)}
              placeholder="your handle"
              className="w-full mb-6 px-5 py-3 rounded-xl border focus:ring-2 focus:ring-pink-300 outline-none"
            />

            <div className="space-y-4">
              {links.map((item, index) => (
                <div key={index} className="bg-pink-50 p-5 rounded-2xl border">
                  <input
                    value={item.linktext}
                    onChange={(e) =>
                      handleChange(index, item.link, e.target.value)
                    }
                    placeholder="Link Title"
                    className="w-full mb-3 px-4 py-2 rounded-lg border"
                  />
                  <input
                    value={item.link}
                    onChange={(e) =>
                      handleChange(index, e.target.value, item.linktext)
                    }
                    placeholder="https://example.com"
                    className="w-full px-4 py-2 rounded-lg border"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={addLink}
              className="mt-5 px-6 py-3 bg-black text-white rounded-full font-semibold hover:scale-105 transition"
            >
              + Add Link
            </button>

            {/* PROFILE */}
            <div className="mt-8 space-y-4">
              <input
                value={pic}
                onChange={(e) => setpic(e.target.value)}
                placeholder="Profile Image URL"
                className="w-full px-5 py-3 border rounded-xl"
              />
              <input
                value={desc}
                onChange={(e) => setdesc(e.target.value)}
                placeholder="Description"
                className="w-full px-5 py-3 border rounded-xl"
              />
            </div>

            {/* BUTTON */}
            <button
              disabled={!pic || !handle || !links?.[0]?.linktext}
              onClick={submitLinks}
              className="mt-6 w-full py-4 rounded-2xl bg-gradient-to-r from-black to-black text-white font-bold disabled:opacity-50 hover:scale-[1.02] transition"
            >
              🚀 Create BitTree
            </button>
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="absolute w-80 h-80 bg-pink-300 blur-3xl opacity-40 rounded-full -top-10 -left-10"></div>
            <div className="absolute w-80 h-80 bg-purple-300 blur-3xl opacity-40 rounded-full bottom-0 right-0"></div>
            <img
              src="/generate.png"
              alt="preview"
              className="relative w-full max-w-md"
            />
          </div>
        </div>
        <ToastContainer position="top-center" />
      </div>
    </>
  );
}

export default function Generate() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <GenerateContent />
    </Suspense>
  );
}