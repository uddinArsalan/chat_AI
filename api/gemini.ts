import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { userMessage } = req.body;

    if (!userMessage) {
      return res.status(400).json({ error: "User message is required" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(userMessage);

    res.status(200).json({ response: result.response.text() });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to fetch response from Gemini API" });
  }
}
