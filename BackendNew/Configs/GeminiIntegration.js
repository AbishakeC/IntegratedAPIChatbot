import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing in .env");
}

// ✅ Correct client for @google/genai
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ❌ DO NOT call generateContent here
// ❌ DO NOT use async / await here

export default ai;
