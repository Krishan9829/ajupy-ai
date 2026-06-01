"use client";

import { useState } from "react";
import PromptBox from "../../components/ai/prompt-box";
import ResultGrid from "../../components/ai/result-grid";
import FashionSelector from "../../components/ai/fashion-selector";
import { buildFashionPrompt, FashionType } from "../../lib/fashion-engine";
import AdvancedForm from "../../components/ai/advanced-form";

export default function GeneratorPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<FashionType>("saree");

  // 🔥 toggle between simple + advanced
  const [mode, setMode] = useState<"simple" | "advanced">("advanced");

  const generateAI = async (prompt: string) => {
    if (!prompt || loading) return;

    setLoading(true);

    try {
      const fashionPrompt = buildFashionPrompt(type, prompt);

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: fashionPrompt }),
      });

      if (!res.ok) {
        alert("❌ Failed to generate design");
        setLoading(false);
        return;
      }

      const data = await res.json();

      setResult(data.result); // ✅ matches your API (text + image)
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="ml-[240px] p-6 max-w-4xl">

      {/* TITLE */}
      <h1 className="text-2xl font-bold mb-4">
        👗 Fashion AI Generator
      </h1>

      {/* TYPE SELECTOR */}
      <FashionSelector onSelect={setType} />

      {/* MODE SWITCH */}
      <div className="flex gap-3 my-4">
        <button
          onClick={() => setMode("simple")}
          className={`px-4 py-2 rounded ${
            mode === "simple"
              ? "bg-black text-white"
              : "bg-gray-200"
          }`}
        >
          Simple
        </button>

        <button
          onClick={() => setMode("advanced")}
          className={`px-4 py-2 rounded ${
            mode === "advanced"
              ? "bg-black text-white"
              : "bg-gray-200"
          }`}
        >
          Advanced
        </button>
      </div>

      {/* INPUT SECTION */}
      <div className="bg-white p-5 rounded-xl shadow">
        {mode === "simple" ? (
          <PromptBox onGenerate={generateAI} />
        ) : (
          <AdvancedForm onGenerate={generateAI} />
        )}
      </div>

      {/* LOADING */}
      {loading && (
        <p className="mt-4 animate-pulse">
          ✨ Generating premium fashion design...
        </p>
      )}

      {/* RESULT */}
      <ResultGrid result={result} />

    </div>
  );
}