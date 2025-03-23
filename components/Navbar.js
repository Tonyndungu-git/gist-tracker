import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between">
      <h2 className="text-xl font-bold">Gist Tracker</h2>
      <div>
        <Link href="/" className="mr-4 text-blue-500">Your Gists</Link>
        <Link href="/create" className="mr-4 text-blue-500">Create New Gist</Link>
        {session ? (
          <button onClick={() => signOut()} className="text-red-500">Logout</button>
        ) : null}
      </div>
    </nav>
  );
}
