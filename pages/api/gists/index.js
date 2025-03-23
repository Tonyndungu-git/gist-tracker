import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import dbConnect from "../../../lib/mongodb";
import Gist from "../../../models/Gist";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await dbConnect();

  if (req.method === "GET") {
    try {
      const { search } = req.query;
      const query = search
        ? {
            userId: session.user.id,
            $or: [
              { title: new RegExp(search, "i") },
              { description: new RegExp(search, "i") },
            ],
          }
        : { userId: session.user.id };

      const gists = await Gist.find(query);
      return res.status(200).json(gists);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch gists" });
    }
  }

  if (req.method === "POST") {
    try {
      const { title, description, code } = req.body;

      if (!title || !code) {
        return res.status(400).json({ error: "Title and code are required" });
      }

      const newGist = new Gist({
        userId: session.user.id,
        title,
        description,
        code,
      });

      await newGist.save();

      return res.status(201).json(newGist);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create gist" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
