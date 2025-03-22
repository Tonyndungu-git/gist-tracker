import { useEffect, useState } from "react";

export default function GistList() {
  const [gists, setGists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gists")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setGists(data);
        } else {
          console.error("Invalid gists data:", data);
          setGists([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching gists:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading gists...</p>;
  if (!gists.length) return <p>No gists available.</p>;

  return (
    <div>
      <h2 className="text-xl font-bold">Your Gists</h2>
      <ul>
        {gists.map((gist) => (
          <li key={gist.id || gist._id} className="border p-2 my-2">
            <a href={gist.html_url || "#"} target="_blank" rel="noopener noreferrer">
              {gist.description || "No Description"}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
