
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this environment, we assume it's always available.
  console.warn("API_KEY is not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const fetchAffirmation = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate a single, short, positive affirmation for today. Make it encouraging and uplifting. Do not include any introductory text like 'Here is an affirmation:' or quotes.",
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error fetching affirmation:", error);
    return "Today is a canvas, and you are the artist. Paint it with kindness.";
  }
};
