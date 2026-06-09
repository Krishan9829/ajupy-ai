"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSupabase } from "../../lib/supabase";

const modules = [
  { title: "Saree AI", path: "/saree-ai", icon: "👗" },
  { title: "Textile AI", path: "/textile-ai", icon: "🎨" },
  { title: "Embroidery AI", path: "/embroidery-ai", icon: "🧵" },
  { title: "Color AI", path: "/color-ai", icon: "🌈" },
  { title: "Pattern AI", path: "/pattern-ai", icon: "🔁" },
  { title: "Training Studio", path: "/training", icon: "🧠" },
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState(100);

  useEffect(() => {
  const supabase = getSupabase();

  const checkSession = async () => {
    const { data } = await supabase.auth.getSession();

    setUser(data.session?.user || null);


    setLoading(false);
  };

  checkSession();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user || null);
  });

  return () => subscription.unsubscribe();
}, []);  

  // 🔥 LOGOUT
  async function handleLogout() {
    const supabase = getSupabase();
    await supabase.auth.signOut();
    setUser(null);
  }

  // ⏳ LOADING SCREEN
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="animate-pulse text-lg">Checking authentication...</p>
      </div>
    );
  }

  // ❌ NOT LOGGED IN UI (NO AUTO REDIRECT)
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <h2 className="text-2xl mb-4">🔒 Login Required</h2>

        <Link href="/auth">
          <button className="px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-700">
            Go to Login
          </button>
        </Link>
      </div>
    );
  }

  // ✅ DASHBOARD UI
  return (
    <div className="min-h-screen bg-black text-white p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-5xl font-bold">🚀 AJUPY AI Dashboard</h1>

          <p className="text-zinc-400 mt-2 max-w-xl">
            World's First AI Operating System for Fashion & Textile Industry
          </p>

          <p className="text-green-400 mt-3 text-sm">
            Logged in as: {user?.email}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-zinc-900 border border-zinc-800 px-5 py-3 rounded-xl">
            Credits: {credits}
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded-xl hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-4 mt-10">

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl">
          <p className="text-zinc-400 text-sm">Total Generations</p>
          <h2 className="text-2xl font-bold mt-2">24</h2>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl">
          <p className="text-zinc-400 text-sm">Credits Remaining</p>
          <h2 className="text-2xl font-bold mt-2">{credits}</h2>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl">
          <p className="text-zinc-400 text-sm">Active Model</p>
          <h2 className="text-2xl font-bold mt-2">FLUX Pro</h2>
        </div>

      </div>

      {/* MODULES */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {modules.map((module) => (
          <Link
            key={module.title}
            href={module.path}
            className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-6 
            hover:border-white hover:scale-105 transition-all duration-300"
          >
            <div className="text-4xl">{module.icon}</div>

            <h3 className="text-xl font-semibold mt-4">
              {module.title}
            </h3>

            <p className="text-zinc-400 mt-2">
              Launch AI module
            </p>
          </Link>
        ))}
      </div>

    </div>
  );
}