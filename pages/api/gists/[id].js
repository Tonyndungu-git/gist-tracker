import connectDB from "../../../lib/mongodb";
import Gist from "../../../models/Gist";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  await connectDB();
  const session = await getSession({ req });

  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const { id } = req.query;

  if (req.method === "PUT") {
    const { title, description, code } = req.body;
    const updatedGist = await Gist.findByIdAndUpdate(id, { title, description, code }, { new: true });
    return res.status(200).json(updatedGist);
  }

  if (req.method === "DELETE") {
    await Gist.findByIdAndDelete(id);
    return res.status(200).json({ message: "Gist deleted" });
  }

  res.status(405).json({ error: "Method Not Allowed" });
}