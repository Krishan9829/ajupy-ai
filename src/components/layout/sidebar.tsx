"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `px-3 py-2 rounded-lg transition ${
      pathname === path
        ? "bg-white text-black"
        : "text-gray-400 hover:text-white hover:bg-gray-800"
    }`;

  return (
    <aside className="w-[240px] h-screen bg-gray-950 border-r border-gray-800 p-6 fixed left-0 top-0 text-white flex flex-col justify-between">

      {/* TOP */}
      <div>
        <h2 className="text-2xl font-bold mb-8 tracking-wide">
          AJUPY AI
        </h2>

        <nav className="flex flex-col gap-2">
          <Link href="/dashboard" className={linkClass("/dashboard")}>
            📊 Dashboard
          </Link>

          <Link href="/history" className={linkClass("/history")}>
            🕒 History
          </Link>

          <Link href="/generator" className={linkClass("/generator")}>
            🎨 Generator
          </Link>

          <Link href="/collections" className={linkClass("/collections")}>
            🗂️ Collections
          </Link>

          <Link href="/pricing" className={linkClass("/pricing")}>
            💰 Pricing
          </Link>

          <Link href="/settings" className={linkClass("/settings")}>
            ⚙️ Settings
          </Link>
        </nav>
      </div>

      {/* BOTTOM */}
      <div className="text-xs text-gray-500">
        © 2026 AJUPY AI
      </div>

    </aside>
  );
}