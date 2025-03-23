import { useEffect, useState } from "react";

export default function GistListPage() {
  const [gists, setGists] = useState([]);

  useEffect(() => {
    const fetchGists = async () => {
      try {
        const response = await fetch("/api/gists"); // Fetch from API
        const data = await response.json();
        console.log("Fetched Gists:", data); // Debugging
        setGists(data);
      } catch (error) {
        console.error("Error fetching gists:", error);
      }
    };

    fetchGists();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Your Gists</h1>
      <ul>
        {gists.length > 0 ? (
          gists.map((gist) => (
            <li key={gist._id} className="mb-4 bg-white p-4 rounded shadow">
              <h3 className="text-xl font-bold">{gist.title}</h3>
              <p className="text-gray-600">{gist.description}</p>
              <pre className="bg-gray-100 p-2 mt-2 rounded text-sm">{gist.code}</pre>
            </li>
          ))
        ) : (
          <p>No gists found.</p>
        )}
      </ul>
    </div>
  );
}
