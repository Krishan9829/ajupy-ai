"use client";

import { useState } from "react";

export default function SareeAI() {
  const [form, setForm] = useState({
    fabric: "",
    region: "",
    festival: "",
    embroidery: "",
    colors: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  async function generate() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const prompt = `
Saree Design AI:
Fabric: ${form.fabric}
Region: ${form.region}
Festival: ${form.festival}
Embroidery: ${form.embroidery}
Colors: ${form.colors}
      `;

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          style: "luxury bridal",
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || "Generation failed");
      }

      setResult(data.result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">

      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-2">
        👗 Saree Design AI
      </h1>

      <p className="text-gray-400 mb-8">
        Generate premium Indian textile designs using AI
      </p>

      {/* INPUT GRID */}
      <div className="grid md:grid-cols-2 gap-4">
        {Object.entries(form).map(([key, value]) => (
          <input
            key={key}
            placeholder={key.toUpperCase()}
            className="p-3 bg-gray-800 rounded outline-none"
            value={value}
            onChange={(e) =>
              setForm({ ...form, [key]: e.target.value })
            }
          />
        ))}
      </div>

      {/* BUTTON */}
      <button
        onClick={generate}
        disabled={loading}
        className="mt-6 bg-blue-600 px-6 py-3 rounded font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Generating AI Design..." : "Generate Design 🚀"}
      </button>

      {/* ERROR */}
      {error && (
        <div className="mt-4 text-red-400">
          ⚠️ {error}
        </div>
      )}

      {/* RESULT */}
      {result && (
        <div className="mt-8 space-y-4">

          {/* IMAGE */}
          {result.image && (
            <img
              src={result.image}
              className="rounded-xl w-full max-w-xl"
            />
          )}

          {/* TEXT */}
          <div className="bg-gray-900 p-5 rounded-xl">
            <h2 className="font-bold mb-2">
              AI Design Description
            </h2>
            <p className="text-gray-300 whitespace-pre-line">
              {result.text}
            </p>
          </div>

        </div>
      )}
    </div>
  );
}