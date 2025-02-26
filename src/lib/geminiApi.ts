// import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

// const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// export async function fetchGeminiResponse(userMessage: string) {
//   const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
//   const result = await model.generateContent(userMessage);

//   return result.response.text();
// }

export async function fetchGeminiResponse(
  userMessage: string
): Promise<string> {
  try {
    const response = await axios.post("/api/gemini", { userMessage });

    return response.data.response || "No response from AI.";
  } catch (error) {
    console.error("Error fetching Gemini response:", error);
    throw new Error("Failed to fetch response from AI.");
  }
}
