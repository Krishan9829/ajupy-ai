"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-[240px] h-screen bg-gray-950 border-r border-gray-800 p-6 fixed left-0 top-0 text-white">
      <h2 className="text-2xl font-bold mb-8">
        AJUPY AI
      </h2>

      <nav className="flex flex-col gap-4">
        <Link
          href="/dashboard"
          className="hover:text-blue-400"
        >
          Dashboard
        </Link>

        <Link
          href="/history"
          className="hover:text-blue-400"
        >
          History
        </Link>

        <Link
          href="/generator"
          className="hover:text-blue-400"
        >
          Generator
        </Link>

        <Link
          href="/collections"
          className="hover:text-blue-400"
        >
          Collections
        </Link>

        <Link
          href="/pricing"
          className="hover:text-blue-400"
        >
          Pricing
        </Link>

        <Link
          href="/settings"
          className="hover:text-blue-400"
        >
          Settings
        </Link>
      </nav>
    </aside>
  );
}