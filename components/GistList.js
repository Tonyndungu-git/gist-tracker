import { useEffect, useState } from "react";

export default function GistList() {
  const [gists, setGists] = useState([]);

  useEffect(() => {
    fetch("/api/gists")
      .then((res) => res.json())
      .then((data) => setGists(data))
      .catch((err) => console.error("Failed to fetch gists", err));
  }, []);

  return (
    <div>
      <h2>Your Gists</h2>
      {gists.length === 0 ? (
        <p>No gists found.</p>
      ) : (
        <ul>
          {gists.map((gist) => (
            <li key={gist._id}>
              <h3>{gist.title}</h3>
              <p>{gist.description}</p>
              <pre>{gist.code}</pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
