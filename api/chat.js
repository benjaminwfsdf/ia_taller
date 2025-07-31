import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Solo se permite POST" });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Falta el campo 'prompt'" });
    }

    const completion = await openai.chat.completions.create({
  model: "gpt-4", // <-- cambia esto
  messages: [
    {
      role: "system",
      content: "Eres un mecánico automotriz experto..."
    },
    { role: "user", content: prompt }
  ]
});

    res.status(200).json({ respuesta: completion.choices[0].message.content });
  } catch (error) {
    console.error("ERROR GPT:", error);
    res.status(500).json({ error: error.message || "Error en el servidor" });
  }
}
