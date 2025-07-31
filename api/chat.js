// api/chat.js
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Solo POST permitido" });
  }

  const { prompt } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "Eres un experto en diagnóstico automotriz. Responde códigos de avería OBD2 como P0300, P0420, etc., explicando causas, posibles soluciones y pasos para repararlo."
        },
        { role: "user", content: prompt }
      ]
    });

    res.status(200).json({ respuesta: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
