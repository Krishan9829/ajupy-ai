"use client";

import { useState } from "react";
import Sidebar from "../../components/layout/sidebar";

export default function EmbroideryAI() {
  const [style, setStyle] = useState("");
  const [result, setResult] = useState("");

  async function generate() {
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({
        prompt: `Generate ${style} embroidery design`,
      }),
    });

    const data = await res.json();
    setResult(data.result);
  }

  return (
    <div className="flex bg-black text-white min-h-screen">
      <Sidebar />

      <div className="ml-[260px] p-8">
        <h1 className="text-3xl font-bold mb-6">
          🧵 Embroidery AI
        </h1>

        <input
          placeholder="zari / mirror / beadwork"
          className="p-3 bg-gray-800 rounded w-full"
          onChange={(e) => setStyle(e.target.value)}
        />

        <button
          onClick={generate}
          className="mt-5 bg-blue-600 px-6 py-2 rounded"
        >
          Generate
        </button>

        {result && (
          <div className="mt-6 bg-gray-800 p-4 rounded">
            {result}
          </div>
        )}
      </div>
    </div>
  );
}