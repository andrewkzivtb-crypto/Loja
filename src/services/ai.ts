import { GoogleGenAI } from '@google/genai';
import { AI_SYSTEM_PROMPT } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateChatResponse(history: { role: 'user' | 'model'; parts: { text: string }[] }[], userMessage: string) {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: AI_SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    // We need to simulate the history by sending it to the model if possible,
    // but the @google/genai SDK chat object doesn't accept initial history easily in create().
    // We can just pass the whole conversation as a single prompt or use the chat object.
    // Actually, we can just use generateContent with the full history.
    
    const contents = history.map(msg => ({
      role: msg.role,
      parts: msg.parts
    }));
    
    contents.push({ role: 'user', parts: [{ text: userMessage }] });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: AI_SYSTEM_PROMPT,
        temperature: 0.7,
      }
    });

    return response.text || "Desculpe, não entendi. Pode repetir?";
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "Desculpe, estou com uma instabilidade no momento. Tente novamente em instantes.";
  }
}
