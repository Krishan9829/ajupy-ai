"use client";

import { useState } from "react";
import LoginForm from "../../components/auth/login-form";
import SignupForm from "../../components/auth/signup-form";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-center mb-2">
          AJUPY AI
        </h1>

        <p className="text-center text-zinc-400 mb-8">
          AI Operating System for Fashion Industry
        </p>

        <div className="flex mb-8 bg-zinc-800 rounded-xl p-1">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2 rounded-lg transition ${
              mode === "login"
                ? "bg-white text-black"
                : "text-white"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setMode("signup")}
            className={`flex-1 py-2 rounded-lg transition ${
              mode === "signup"
                ? "bg-white text-black"
                : "text-white"
            }`}
          >
            Sign Up
          </button>
        </div>

        {mode === "login" ? <LoginForm /> : <SignupForm />}
      </div>
    </main>
  );
}