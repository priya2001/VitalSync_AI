import { GoogleGenAI } from "@google/genai";
import User from "../models/User.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const getAIInsights = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    const { heartRate, steps, focus, calories } = user.healthData;

    const prompt = `You are a health AI assistant.

Based on the following health metrics, provide a short health insight in maximum 2 sentences.

Heart Rate: ${heartRate} bpm
Steps: ${steps}
Focus Hours: ${focus}
Calories Burned: ${calories}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({
      insight: response.text,
    });
  } catch (err) {
    console.error(err);

    res.json({
      insight:
        "Stay hydrated, maintain consistent sleep, and aim for 10,000 steps daily!",
    });
  }
};