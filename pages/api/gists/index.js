import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import dbConnect from "../../../lib/mongodb"; 
import Gist from "../../../models/Gist"; 

export default async function handler(req, res) {
  try {
    // Authenticate user
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    // Connect to the database
    await dbConnect();

    switch (req.method) {
      case "GET":
        return await handleGet(req, res, session);

      case "POST":
        return await handlePost(req, res, session);

      default:
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Handle GET request (fetch gists)
async function handleGet(req, res, session) {
  try {
    const { search } = req.query;
    const query = search
      ? {
          userId: session.user.id,
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ],
        }
      : { userId: session.user.id };

    const gists = await Gist.find(query);
    return res.status(200).json(gists);
  } catch (error) {
    console.error("GET /api/gists Error:", error);
    return res.status(500).json({ error: "Failed to fetch gists" });
  }
}

// Handle POST request (create a new gist)
async function handlePost(req, res, session) {
  try {
    const { title, description, code } = req.body;

    if (!title || !code) {
      return res.status(400).json({ error: "Title and code are required" });
    }

    const newGist = new Gist({
      userId: session.user.id,
      title,
      description: description || "",
      code,
    });

    await newGist.save();
    return res.status(201).json(newGist);
  } catch (error) {
    console.error("POST /api/gists Error:", error);
    return res.status(500).json({ error: "Failed to create gist" });
  }
}
