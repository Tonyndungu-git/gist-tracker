import { useRouter } from "next/router";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function CreateGist() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", description: "", code: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/gists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/");
  };

  return (
    <div className="p-6">
      <Navbar />
      <h1 className="text-2xl font-bold">Create New Gist</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <input type="text" placeholder="Title" className="w-full p-2 border" value={form.title} 
               onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <textarea placeholder="Description" className="w-full p-2 border mt-2" value={form.description} 
                  onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <textarea placeholder="Code Snippet" className="w-full p-2 border mt-2" value={form.code} 
                  onChange={(e) => setForm({ ...form, code: e.target.value })} />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 mt-2 rounded">Save</button>
      </form>
    </div>
  );
}
