import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();
  const [user, setUser] = useState({ name: "", bio: "", avatar: "" });

  useEffect(() => {
    if (session) {
      fetch("/api/profile")
        .then((res) => res.json())
        .then((data) => setUser(data));
    }
  }, [session]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    alert("Profile updated!");
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete your account?")) {
      await fetch(`/api/profile/${user._id}`, { method: "DELETE" });
      signOut();
    }
  };

  if (!session) return <p>Please log in.</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-4 shadow-md rounded-md">
      <h2 className="text-2xl font-bold">Profile</h2>
      <img src={user.avatar} alt="Avatar" className="w-16 h-16 rounded-full" />
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Name"
        className="block w-full border p-2 rounded mt-2"
      />
      <textarea
        name="bio"
        value={user.bio}
        onChange={handleChange}
        placeholder="Bio"
        className="block w-full border p-2 rounded mt-2"
      />
      <input
        type="text"
        name="avatar"
        value={user.avatar}
        onChange={handleChange}
        placeholder="Avatar URL"
        className="block w-full border p-2 rounded mt-2"
      />
      <button onClick={handleUpdate} className="bg-blue-500 text-white p-2 rounded mt-4">
        Update Profile
      </button>
      <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded mt-4 ml-2">
        Delete Account
      </button>
    </div>
  );
}
