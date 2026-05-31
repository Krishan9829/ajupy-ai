"use client";

import { useState } from "react";
import Sidebar from "../../components/layout/sidebar";

export default function DashboardPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateAI() {
    if (!prompt) return;

    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await res.json();
     setResponse(
  JSON.stringify(data, null, 2)
);
await fetch("/api/save-prompt", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    prompt,
    response: data.result,
  }),
});
     } catch (error) {
      console.error(error);
      setResponse("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <main className="flex-1 ml-[260px] p-8">
        <h1 className="text-4xl font-bold mb-8">
          AJUPY AI Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-5 mb-8">
          <div className="bg-gray-900 p-6 rounded-xl">
            Total Designs
          </div>

          <div className="bg-gray-900 p-6 rounded-xl">
            AI Credits
          </div>

          <div className="bg-gray-900 p-6 rounded-xl">
            Collections
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">
            AI Generator
          </h2>

          <textarea
            className="w-full h-40 p-4 rounded-lg bg-gray-800 border border-gray-700"
            placeholder="Describe what you want AI to generate..."
            value={prompt}
            onChange={(e) =>
              setPrompt(e.target.value)
            }
          />

          <button
            onClick={generateAI}
            disabled={loading}
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
          >
            {loading
              ? "Generating..."
              : "Generate"}
          </button>

          {response && (
            <div className="mt-6 bg-gray-800 p-5 rounded-lg whitespace-pre-wrap">
              {response}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}