"use client";

import { useState } from "react";
import { getSupabase } from "../../lib/supabase"; // ✅ FIX
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ CREATE INSTANCE
  const supabase = getSupabase();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setErrorMsg("");

    // ✅ validation
    if (!email || !password) {
      setErrorMsg("Please fill all fields");
      return;
    }

    // ✅ safety
    if (!supabase) {
      setErrorMsg("Server not ready. Try again later.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    // ✅ success
    router.push("/dashboard");
  }

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4 w-full max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold text-center text-white">
        Login to AJUPY AI
      </h2>

      {/* ERROR */}
      {errorMsg && (
        <p className="text-red-500 text-sm text-center">
          {errorMsg}
        </p>
      )}

      <input
        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg font-semibold text-white disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="text-center text-gray-400">
        Don't have an account?{" "}
        <a
          href="/auth/signup"
          className="text-blue-400 hover:underline"
        >
          Sign Up
        </a>
      </p>
    </form>
  );
}