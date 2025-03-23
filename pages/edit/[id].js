import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function EditGist() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [gist, setGist] = useState({ title: "", description: "", code: "" });

  useEffect(() => {
    if (!session) return; // Ensure only authenticated users can fetch data
    if (id) {
      fetch(`/api/gists/${id}`)
        .then((res) => res.json())
        .then((data) => setGist(data))
        .catch((err) => console.error("Error fetching gist:", err));
    }
  }, [id, session]);

  if (status === "loading") return <p>Loading...</p>;
  if (!session) {
    router.push("/api/auth/signin");
    return <p>Redirecting to login...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/gists/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gist),
    });

    if (res.ok) {
      router.push("/");
    } else {
      console.error("Failed to update gist");
    }
  };

  return (
    <div>
      <h1>Edit Gist</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={gist.title}
          onChange={(e) => setGist({ ...gist, title: e.target.value })}
          placeholder="Title"
        />
        <textarea
          value={gist.description}
          onChange={(e) => setGist({ ...gist, description: e.target.value })}
          placeholder="Description"
        />
        <textarea
          value={gist.code}
          onChange={(e) => setGist({ ...gist, code: e.target.value })}
          placeholder="Code"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
