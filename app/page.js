"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()
  const [text, setText] = useState("")


  const createTree = () => {

    router.push(`/generate?handle=${text}`)
  }
  return (
    <main className="bg-black">

      <div className="py-10 lg:py-20">

        <section className="bg-black min-h-[50vh] grid grid-cols-1 lg:grid-cols-2 items-center">

          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-center px-6 lg:ml-[10vw] gap-4 mt-10 lg:mt-8">

            <p className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl">
              Everything you
            </p>

            <p className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl">
              are. In one,
            </p>

            <p className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl">
              simple link in bio.
            </p>

            <p className="text-gray-400 text-sm sm:text-base lg:text-lg my-4 leading-relaxed">
              Join 50M+ people using Linktree for their link in bio. One link to help you
              share everything you create, curate and sell from your Instagram, TikTok,
              Twitter, YouTube and other social media profiles.
            </p>

            {/* INPUT + BUTTON */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">

              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="px-4 py-3 rounded-md bg-[#262626] text-white border border-white/20 focus:outline-none focus:border-white w-full sm:w-auto"
                type="text"
                placeholder="Enter your Handle"
              />

              <button
                onClick={() => createTree()}
                className="bg-white text-black rounded-full px-6 py-3 font-semibold hover:scale-105 transition-all duration-300"
              >
                Claim your Bittree
              </button>

            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center items-center mt-10 lg:mt-12 px-6 lg:mr-[130px]">

            <img
              src="/home.png"
              alt="homepage image"
              className="w-full max-w-[500px] h-auto"
            />

          </div>

        </section>

      </div>

    </main>
  );
}
