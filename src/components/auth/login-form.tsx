"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Login Success");
    router.push("/dashboard");
  }

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4 w-full"
    >
      <input
        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 outline-none"
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 outline-none"
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg font-semibold text-white"
      >
        {loading
          ? "Logging in..."
          : "Login"}
      </button>

      <p className="text-center text-gray-400">
        Don't have an account?{" "}
        <a
          href="/auth/signup"
          className="text-blue-400"
        >
          Sign Up
        </a>
      </p>
    </form>
  );
}