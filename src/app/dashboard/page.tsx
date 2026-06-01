"use client";

import Link from "next/link";

const modules = [
  {
    title: "Saree Design AI",
    path: "/saree-ai",
    desc: "Generate full saree designs",
    icon: "👗",
  },
  {
    title: "Textile Print AI",
    path: "/textile-ai",
    desc: "Create seamless patterns",
    icon: "🎨",
  },
  {
    title: "Embroidery AI",
    path: "/embroidery-ai",
    desc: "Generate embroidery layouts",
    icon: "🧵",
  },
  {
    title: "Color Intelligence",
    path: "/color-ai",
    desc: "Trending palettes & insights",
    icon: "🌈",
  },
  {
    title: "Pattern Generator",
    path: "/pattern-ai",
    desc: "Tile & repeat patterns",
    icon: "🔁",
  },
  {
    title: "AI Models",
    path: "/ai-models",
    desc: "Manage models",
    icon: "🤖",
  },
  {
    title: "AI Workflow",
    path: "/workflow",
    desc: "Understand AI pipeline",
    icon: "⚙️",
  },
  {
    title: "Training Studio",
    path: "/training",
    desc: "Train your own AI models",
    icon: "🧠",
  },
];

export default function DashboardPage() {
  return (
    <main className="flex-1 p-8 bg-black text-white">
      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-2">
        🚀 AJUPY AI Dashboard
      </h1>

      <p className="text-gray-400 mb-8">
        World's First AI Textile Operating System
      </p>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {modules.map((item, i) => (
          <Link key={i} href={item.path}>
            <div className="bg-gray-900 hover:bg-gray-800 transition p-6 rounded-xl cursor-pointer group">
              
              <div className="text-3xl mb-3 group-hover:scale-110 transition">
                {item.icon}
              </div>

              <h2 className="text-xl font-semibold">
                {item.title}
              </h2>

              <p className="text-gray-400 mt-2 text-sm">
                {item.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}