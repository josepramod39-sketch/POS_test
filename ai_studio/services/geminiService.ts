
import { GoogleGenAI } from "@google/genai";

export const getAiSupport = async (userMessage: string) => {
  // Initialize GoogleGenAI within the function to ensure it uses the most current API_KEY from the environment
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: `You are EDITH Assistant, a helpful expert on the E.D.I.T.H Rp payment platform. 
        E.D.I.T.H Rp turns smartphones into POS terminals using NFC. 
        Key facts: 
        - 1.99% fee per in-person sale.
        - 4.99% + $0.30 for payment links.
        - Instant payouts to EDITH Visa card.
        - No extra hardware needed.
        Keep answers short, bold, and energetic. Use sentence fragments like the brand style.`,
        temperature: 0.7,
      },
    });
    
    // Access response.text directly as a property, providing a fallback for undefined results
    return response.text ?? "I'm here to help, but I'm having trouble finding the words right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting. Try again in a second.";
  }
};
