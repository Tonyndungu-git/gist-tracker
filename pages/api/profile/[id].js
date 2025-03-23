import { getSession } from "next-auth/react";
import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";
import Gist from "../../../models/Gist";

export default async function handler(req, res) {
  await dbConnect();
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "DELETE") {
    try {
      const { id } = req.query;

      // Delete all user's gists
      await Gist.deleteMany({ userId: id });

      // Delete the user profile
      await User.findByIdAndDelete(id);

      return res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}