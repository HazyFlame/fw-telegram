// Vercel handler (API route)
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { chat_id, text, parse_mode, token } = req.body;

  if (!chat_id || !text) {
    return res.status(400).json({ error: "Missing chat_id or text" });
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const tgRes = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id,
        text: text,
        parse_mode: parse_mode
      }),
    });

    const result = await tgRes.json();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to send message", details: err.message });
  }
}
