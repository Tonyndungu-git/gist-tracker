import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function GistDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [gist, setGist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/gists/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setGist(data);
          setLoading(false);
        })
        .catch((err) => console.error("Error fetching gist:", err));
    }
  }, [id]);

  if (loading) return <p>Loading gist...</p>;
  if (!gist) return <p>Gist not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{gist.title}</h1>
      <p className="text-gray-600">{gist.description}</p>
      <pre className="bg-gray-200 p-4 rounded">{gist.code}</pre>
      <button
        onClick={() => router.push("/")}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Back to Gists
      </button>
    </div>
  );
}
