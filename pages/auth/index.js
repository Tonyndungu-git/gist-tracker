import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

export default function AuthLandingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to Gist Tracker</h1>
      <p className="mb-6">Sign in or create an account to get started.</p>
      <div className="space-x-4">
        <button
          onClick={() => signIn("github")}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Sign in with GitHub
        </button>
        <button
          onClick={() => router.push("/auth/signin")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Sign In
        </button>
        <button
          onClick={() => router.push("/auth/signup")}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
