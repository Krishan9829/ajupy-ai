import SignupForm from "../../../components/auth/signup-form";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-800">
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          AJUPY AI
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Create your account
        </p>

        <SignupForm />
      </div>
    </main>
  );
}