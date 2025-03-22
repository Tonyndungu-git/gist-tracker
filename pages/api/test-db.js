import { connectToDatabase } from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const db = await connectToDatabase();
    res.status(200).json({ message: "Connected to MongoDB successfully!" });
  } catch (error) {
    res.status(500).json({ error: "MongoDB connection failed." });
  }
}
