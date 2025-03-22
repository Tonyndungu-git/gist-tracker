import { useState } from "react";

export default function CreateGistForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("/api/gists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, code }),
    });

    setLoading(false);
    if (!response.ok) return alert("Error creating gist");

    setTitle("");
    setDescription("");
    setCode("");
    alert("Gist created successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border p-2 w-full"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full"
      />
      <textarea
        placeholder="Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
        className="border p-2 w-full"
      />
      <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2">
        {loading ? "Creating..." : "Create Gist"}
      </button>
    </form>
  );
}
