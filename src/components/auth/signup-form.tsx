"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      "Account created successfully. Please check your email."
    );

    router.push("/auth/login");
  }

  return (
    <form
      onSubmit={handleSignup}
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
        placeholder="Create Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 transition p-3 rounded-lg font-semibold text-white"
      >
        {loading
          ? "Creating Account..."
          : "Sign Up"}
      </button>

      <p className="text-center text-gray-400">
        Already have an account?{" "}
        <a
          href="/auth/login"
          className="text-blue-400"
        >
          Login
        </a>
      </p>
    </form>
  );
}