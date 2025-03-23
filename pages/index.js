import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [gists, setGists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch gists function
  const fetchGists = async () => {
    try {
      const res = await fetch("/api/gists");
      const data = await res.json();
      console.log("Fetched Gists:", data);
      setGists(Array.isArray(data) ? data : data?.gists || []);
    } catch (error) {
      console.error("Error fetching gists:", error);
      setGists([]);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    } else if (status === "authenticated") {
      fetchGists();
    }
  }, [status]);

  if (status === "loading") return <p>Loading...</p>;

  // DELETE GIST FUNCTION
  const deleteGist = async (id) => {
    if (!confirm("Are you sure you want to delete this gist?")) return;
    
    try {
      const res = await fetch(`/api/gists/${id}`, { method: "DELETE" });
      if (res.ok) {
        setGists(gists.filter((gist) => gist._id !== id));
      } else {
        console.error("Failed to delete gist");
      }
    } catch (error) {
      console.error("Error deleting gist:", error);
    }
  };

  // Filter gists based on search term
  const filteredGists = gists.filter((gist) =>
    gist.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <Navbar />
      <h1 className="text-2xl font-bold">Your Gists</h1>

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => router.push("/create")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          New Gist
        </button>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search gists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/3"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {filteredGists.length > 0 ? (
          filteredGists.map((gist) => (
            <div key={gist._id} className="bg-white p-4 shadow rounded">
              <h3 className="text-xl font-bold">{gist.title}</h3>
              <p className="text-gray-600">{gist.description}</p>
              <pre className="bg-gray-100 p-2 mt-2 rounded text-sm">
                {gist.code}
              </pre>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => router.push(`/gist/${gist._id}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  View
                </button>
                <button
                  onClick={() => router.push(`/edit/${gist._id}`)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteGist(gist._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No gists found.</p>
        )}
      </div>
    </div>
  );
}
