export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const externalApiUrl = process.env.VITE_TIMELINE_API_URL;

  try {
    const response = await fetch(externalApiUrl, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        ...req.headers,
      },
      body: req.method === "POST" ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
