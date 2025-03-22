import connectDB from "../../../lib/mongodb";
import Gist from "../../../models/Gist";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  await connectDB();
  const session = await getSession({ req });

  if (!session) return res.status(401).json({ error: "Unauthorized" });

  if (req.method === "GET") {
    const gists = await Gist.find({ userId: session.user.id });
    return res.status(200).json(gists);
  }

  if (req.method === "POST") {
    const { title, description, code } = req.body;
    const newGist = await Gist.create({ title, description, code, userId: session.user.id });
    return res.status(201).json(newGist);
  }

  res.status(405).json({ error: "Method Not Allowed" });
}
