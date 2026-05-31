"use client";

import { useState } from "react";
import PromptBox from "../../components/ai/prompt-box";
import ResultGrid from "../../components/ai/result-grid";
import FashionSelector from "../../components/ai/fashion-selector";
import { buildFashionPrompt, FashionType } from "../../lib/fashion-engine";

export default function GeneratorPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<FashionType>("saree");

  const generateAI = async (prompt: string) => {
    if (!prompt) return;

    setLoading(true);

    const fashionPrompt = buildFashionPrompt(type, prompt);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: fashionPrompt }),
    });

    const data = await res.json();

    setResult(data.result);
    setLoading(false);
  };

  return (
    <div>
      <h1>👗 Fashion AI Generator</h1>

      <FashionSelector onSelect={setType} />

      <PromptBox onGenerate={generateAI} />

      {loading && <p>Creating fashion design...</p>}

      <ResultGrid result={result} />
    </div>
  );
}