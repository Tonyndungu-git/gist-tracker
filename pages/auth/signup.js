import { useState } from "react";
import { useRouter } from "next/router";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      router.push("/auth/signin");
    } else {
      console.error("Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="border p-2 w-full" type="text" placeholder="Name" required onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <input className="border p-2 w-full" type="email" placeholder="Email" required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <input className="border p-2 w-full" type="password" placeholder="Password" required onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Sign Up</button>
      </form>
    </div>
  );
}
