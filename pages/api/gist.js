import dbConnect from "../../utils/dbConnect";
import Gist from "../../models/Gist"; // Ensure you have this model

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const gists = await Gist.find({});
      res.status(200).json({ gists });
    } catch (error) {
      console.error("Error fetching gists:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
