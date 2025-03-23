import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import dbConnect from "../../../lib/mongodb";
import Gist from "../../../models/Gist";

export default async function handler(req, res) {
  await dbConnect();
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const gist = await Gist.findById(id);
      if (!gist) return res.status(404).json({ error: "Gist not found" });
      return res.status(200).json(gist);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "PUT") {
    try {
      const { title, description, code } = req.body;

      const updatedGist = await Gist.findByIdAndUpdate(
        id,
        { title, description, code },
        { new: true }
      );

      return res.status(200).json(updatedGist);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      await Gist.findByIdAndDelete(id);
      return res.status(200).json({ message: "Gist deleted" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
