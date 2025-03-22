import { useRouter } from "next/router";

export default function AuthLandingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Welcome to Gist Tracker</h1>
      <p className="mb-6">Sign in or create an account to get started.</p>
      <div className="space-x-4">
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
