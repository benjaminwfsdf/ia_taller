// api/chat.js
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
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "Eres un mecánico experto en diagnóstico automotriz. Cuando el usuario te da un código OBD2 como P0300 o P0420, entrega su significado, causas posibles y soluciones paso a paso, de forma clara."
        },
        { role: "user", content: prompt }
      ]
    });

    res.status(200).json({ respuesta: completion.choices[0].message.content });
  } catch (error) {
    console.error("Error del servidor:", error);
    res.status(500).json({ error: "Error del servidor: " + error.message });
  }
}
