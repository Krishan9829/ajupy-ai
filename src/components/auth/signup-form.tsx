"use client";

import { useState } from "react";
import { getSupabase } from "../../lib/supabase"; // ✅ FIXED
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // ✅ CREATE INSTANCE
  const supabase = getSupabase();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    setErrorMsg("");
    setSuccessMsg("");

    // ✅ validation
    if (!email || !password) {
      setErrorMsg("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters");
      return;
    }

    // ✅ safety check
    if (!supabase) {
      setErrorMsg("Server not ready. Try again later.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    setSuccessMsg(
      "Account created! Check your email for verification."
    );

    setTimeout(() => {
      router.push("/auth/login");
    }, 2000);
  }

  return (
    <form
      onSubmit={handleSignup}
      className="flex flex-col gap-4 w-full max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold text-center text-white">
        Create your account
      </h2>

      {/* ERROR */}
      {errorMsg && (
        <p className="text-red-500 text-sm text-center">
          {errorMsg}
        </p>
      )}

      {/* SUCCESS */}
      {successMsg && (
        <p className="text-green-500 text-sm text-center">
          {successMsg}
        </p>
      )}

      <input
        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 outline-none focus:ring-2 focus:ring-green-500"
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 outline-none focus:ring-2 focus:ring-green-500"
        type="password"
        placeholder="Create Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 transition p-3 rounded-lg font-semibold text-white disabled:opacity-50"
      >
        {loading ? "Creating Account..." : "Sign Up"}
      </button>

      <p className="text-center text-gray-400">
        Already have an account?{" "}
        <a
          href="/auth/login"
          className="text-blue-400 hover:underline"
        >
          Login
        </a>
      </p>
    </form>
  );
}