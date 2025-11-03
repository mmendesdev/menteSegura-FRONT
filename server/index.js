import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5174;

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body || {};

  if (!message) return res.status(400).json({ error: "Missing message" });

  // If MY_AI_API_URL is set, forward request to the user's AI API (recommended)
  const MY_AI_API_URL = process.env.MY_AI_API_URL;

  if (MY_AI_API_URL) {
    try {
      const headers = { "Content-Type": "application/json" };
      // Optional API key for user's API
      if (process.env.MY_AI_API_KEY) {
        // Support common header names: Authorization (Bearer) or x-api-key
        if (process.env.MY_AI_API_KEY.startsWith("Bearer ")) {
          headers["Authorization"] = process.env.MY_AI_API_KEY;
        } else {
          headers["x-api-key"] = process.env.MY_AI_API_KEY;
        }
      }

      // Forward as-is: include message and history
      const r = await fetch(MY_AI_API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({ message, history }),
      });

      if (!r.ok) {
        const text = await r.text();
        console.error("User AI API error", r.status, text);
        return res.status(502).json({ error: "User AI provider error" });
      }

      // Assume user's API returns JSON with a reply/text field; pass through
      const result = await r.json();
      // Try common fields
      const reply =
        result.reply || result.message || result.text || result.data || "";
      return res.json({ reply, raw: result });
    } catch (err) {
      console.error("Error forwarding to user AI API", err);
      return res.status(500).json({ error: "Error forwarding to user AI API" });
    }
  }

  // If no MY_AI_API_URL, fallback to OpenAI if configured
  const OPENAI_API_KEY =
    process.env.OPENAI_API_KEY || process.env.SERVER_AI_API_KEY;

  if (OPENAI_API_KEY) {
    try {
      // Build messages array for OpenAI
      const messages = [];
      if (history && Array.isArray(history)) {
        history.forEach((h) => {
          messages.push({
            role: h.sender === "user" ? "user" : "assistant",
            content: h.text,
          });
        });
      }
      messages.push({ role: "user", content: message });

      const payload = {
        model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
        messages,
        max_tokens: 500,
      };

      const r = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      if (!r.ok) {
        const text = await r.text();
        console.error("OpenAI error", r.status, text);
        return res.status(502).json({ error: "AI provider error" });
      }

      const result = await r.json();
      const reply = result.choices?.[0]?.message?.content || "";
      return res.json({ reply });
    } catch (err) {
      console.error("AI proxy error", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // Final fallback: canned response
  const reply = `Recebi sua mensagem: ${message}. (Configure MY_AI_API_URL ou OPENAI_API_KEY no servidor para respostas reais.)`;
  return res.json({ reply });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
