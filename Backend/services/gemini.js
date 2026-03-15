import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

function toNiceText(obj) {
  // If Gemini returns structured JSON (like guidance/questions/categories),
  // convert it into a friendly chat message.
  const parts = [];

  if (obj.guidance) parts.push(obj.guidance);

  if (Array.isArray(obj.assessment_questions) && obj.assessment_questions.length) {
    parts.push("A few quick questions:");
    obj.assessment_questions.slice(0, 6).forEach((q, i) => {
      parts.push(`${i + 1}) ${q}`);
    });
  }

  if (Array.isArray(obj.breed_categories) && obj.breed_categories.length) {
    parts.push("Some options to consider:");
    obj.breed_categories.slice(0, 4).forEach((c) => {
      const examples = Array.isArray(c.examples) ? c.examples.join(", ") : "";
      parts.push(`• ${c.category}: ${c.best_for}${examples ? ` (e.g., ${examples})` : ""}`);
    });
  }

  if (obj.recommendation) parts.push(obj.recommendation);

  // Fallback if object doesn't match known schema
  if (parts.length === 0) {
    try {
      return JSON.stringify(obj, null, 2);
    } catch {
      return String(obj);
    }
  }

  return parts.join("\n");
}

export async function getGeminiResponse({ message, context }) {
  const system = `
You are Sharanam NGO's assistant for animal welfare and rescue.

RULES:
- Reply in plain conversational English (NOT JSON).
- Keep it helpful and friendly.
- If you need to ask questions, ask 3-6 short questions.
- If emergency symptoms are mentioned, tell user to call helpline and keep response short.
`;

  const prompt = `
CONTEXT:
${JSON.stringify(context || {}, null, 2)}

USER:
${message}
`;

  const resp = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [{ role: "user", parts: [{ text: system + "\n\n" + prompt }] }],
  });

  const raw = (resp.text || "").trim();

  // If model still returns JSON, parse & convert to nice text
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = null;
  }

  if (parsed && typeof parsed === "object") {
    return {
      reply: toNiceText(parsed),
      intent: "GENERAL",
      urgency: "NORMAL",
      actions: [],
    };
  }

  // Normal plain text
  return {
    reply: raw || "Sorry, I couldn't generate a response.",
    intent: "GENERAL",
    urgency: "NORMAL",
    actions: [],
  };
}