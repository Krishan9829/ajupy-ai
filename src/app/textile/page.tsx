"use client";

import { useState } from "react";
import Sidebar from "../../components/layout/sidebar";

export default function TextileAI() {
  const [type, setType] = useState("");
  const [result, setResult] = useState("");

  async function generate() {
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({
        prompt: `Generate ${type} textile pattern`,
      }),
    });

    const data = await res.json();
    setResult(data.result);
  }

  return (
    <div className="flex bg-black text-white min-h-screen">
      <Sidebar />

      <div className="ml-[260px] p-8 w-full">
        <h1 className="text-3xl font-bold mb-6">
          🎨 Textile Print AI
        </h1>

        <input
          placeholder="floral / geometric / ethnic"
          className="p-3 bg-gray-800 rounded w-full"
          onChange={(e) => setType(e.target.value)}
        />

        <button
          onClick={generate}
          className="mt-5 bg-blue-600 px-6 py-2 rounded"
        >
          Generate Pattern
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