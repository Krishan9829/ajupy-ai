"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
        return;
      }

      // 🔥 IMPORTANT FIX (NO REFRESH LOOP)
      router.replace("/dashboard");

    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setErrorMsg("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-3">
          <p className="text-red-400 text-sm text-center">
            {errorMsg}
          </p>
        </div>
      )}

      <form onSubmit={handleLogin} className="flex flex-col gap-4">

        <input
          type="email"
          placeholder="Email Address"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-sm text-zinc-400"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-white text-black font-semibold rounded-xl p-3"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center text-zinc-400">
        Don't have an account?{" "}
        <Link href="/auth/signup" className="text-white font-semibold">
          Sign Up
        </Link>
      </p>
    </div>
  );
}