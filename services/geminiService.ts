import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

export interface LotteryReport {
  onlineSales: number;
  onlineCashes: number;
  instantSales: number;
  instantCashes: number;
}

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || "" });

/**
 * Sends a message to Gemini and returns the response.
 */
export const sendMessageToGemini = async (message: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: "user", parts: [{ text: message }] }],
    });

    return response.text ?? "I'm here to help, but I'm having trouble finding the words right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting. Try again in a second.";
  }
};

/**
 * Extracts product details from an image using Gemini Pro Vision.
 */
export const extractProductFromImage = async (base64Image: string) => {
  try {
    const prompt = `
      Analyze this image of a product and extract its details.
      Return ONLY a JSON object with the following fields:
      {
        "name": "Name of the product",
        "price_bt": 0.00, (estimate bottle price if not visible)
        "category": "spirits, wine, beer, or misc",
        "sku": "A short alphanumeric SKU code",
        "description": "A brief 1-sentence description"
      }
      If you can't see the price, estimate a reasonable market price.
      If you can't see a SKU, generate a unique short one.
    `;

    // Remove base64 prefix if exists
    const cleanBase64 = base64Image.split(',')[1] || base64Image;

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{
        role: "user",
        parts: [
          { text: prompt },
          {
            inlineData: {
              data: cleanBase64,
              mimeType: "image/jpeg",
            }
          }
        ]
      }]
    });

    const text = response.text || "";

    // Clean JSON response
    const jsonString = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(jsonString) as Partial<Product>;
  } catch (error) {
    console.error("AI Extraction Error:", error);
    throw new Error("Failed to extract product data from image.");
  }
};

/**
 * Extracts lottery report details from an image using Gemini.
 */
export const extractLotteryReport = async (base64Image: string): Promise<LotteryReport> => {
  try {
    const prompt = `
      Analyze this image of a Maryland Lottery Daily Agent Settlement Report.
      Extract the following 4 distinct values:
      1. Online Sales (Draw Games Sales)
      2. Online Cashes (Draw Games Payouts/Cashes)
      3. Instant Sales (Scratch-off Sales/Activated Packs)
      4. Instant Cashes (Scratch-off Payouts/Cashes)

      Return ONLY a JSON object with these keys:
      {
        "onlineSales": 0.00,
        "onlineCashes": 0.00,
        "instantSales": 0.00,
        "instantCashes": 0.00
      }
      If a value is not found, default it to 0. Remove any currency symbols.
    `;

    // Remove base64 prefix if exists
    const cleanBase64 = base64Image.split(',')[1] || base64Image;

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{
        role: "user",
        parts: [
          { text: prompt },
          {
            inlineData: {
              data: cleanBase64,
              mimeType: "image/jpeg",
            }
          }
        ]
      }]
    });

    const text = response.text || "";
    const jsonString = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(jsonString) as LotteryReport;
  } catch (error) {
    console.error("Lottery Extraction Error:", error);
    throw new Error("Failed to extract lottery data from image.");
  }
};

// Alias for backward compatibility with AIChat component
export const getAiSupport = sendMessageToGemini;
