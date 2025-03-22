export default async function handler(req, res) {
    const { method } = req;
    const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
  
    if (!token) {
      return res.status(500).json({ error: "GitHub token is missing" });
    }
  
    try {
      if (method === "GET") {
        // Fetch Gists
        const response = await fetch("https://api.github.com/gists", {
          headers: { Authorization: `token ${token}` },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch gists");
        }
  
        const gists = await response.json();
        return res.status(200).json(gists);
      }
  
      if (method === "POST") {
        // Create Gist
        const { title, description, code } = req.body;
  
        const response = await fetch("https://api.github.com/gists", {
          method: "POST",
          headers: {
            Authorization: `token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description,
            public: true,
            files: {
              [`${title}.txt`]: { content: code },
            },
          }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to create gist");
        }
  
        const newGist = await response.json();
        return res.status(201).json(newGist);
      }
  
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  