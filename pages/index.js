import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function GistPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth"); // Redirect to auth landing page
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome, {session?.user?.name}</h1>
      <p>Your Gists</p>
      {/* Your Gist list component here */}
    </div>
  );
}
