"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState(100);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = getSupabase();

      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.replace("/auth");
        return;
      }

      setUser(data.user);
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  // 🔥 LOGOUT FUNCTION
  async function handleLogout() {
    const supabase = getSupabase();
    await supabase.auth.signOut();
    router.replace("/auth/login");
  }

  // 🔥 LOADING SCREEN
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="animate-pulse text-lg">
          Checking authentication...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-5xl font-bold">
            🚀 AJUPY AI Dashboard
          </h1>

          <p className="text-zinc-400 mt-2 max-w-xl">
            World's First AI Operating System for Fashion,
            Textile & Manufacturing Industries
          </p>

          <p className="text-green-400 mt-3 text-sm">
            Logged in as: {user?.email}
          </p>
        </div>

        {/* ACTIONS */}
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

      {/* QUICK STATS */}
      <div className="grid md:grid-cols-3 gap-4 mt-10">

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl">
          <p className="text-zinc-400 text-sm">
            Total Generations
          </p>
          <h2 className="text-2xl font-bold mt-2">
            24
          </h2>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl">
          <p className="text-zinc-400 text-sm">
            Credits Remaining
          </p>
          <h2 className="text-2xl font-bold mt-2">
            {credits}
          </h2>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl">
          <p className="text-zinc-400 text-sm">
            Active Model
          </p>
          <h2 className="text-2xl font-bold mt-2">
            FLUX Pro
          </h2>
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
            <div className="text-4xl group-hover:scale-110 transition">
              {module.icon}
            </div>

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