
import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";
import { UploadedImage } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateVirtualTryOn = async (
  personImage: UploadedImage,
  clothingImage: UploadedImage
): Promise<string> => {
  try {
    const personImagePart = {
      inlineData: {
        data: personImage.base64,
        mimeType: personImage.mimeType,
      },
    };

    const clothingImagePart = {
      inlineData: {
        data: clothingImage.base64,
        mimeType: clothingImage.mimeType,
      },
    };

    const textPart = {
      text: "Take the clothing item from the second image provided and realistically place it on the person in the first image. The output should be a single, combined image showing the person wearing the clothing. Ensure the fit, lighting, and shadows look natural.",
    };

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [personImagePart, clothingImagePart, textPart],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
      }
    }

    throw new Error("AI did not return an image. It might have returned text instead: " + response.text);
  } catch (error) {
    console.error("Error generating virtual try-on:", error);
    throw new Error("Failed to generate virtual try-on image. The AI service might be unavailable.");
  }
};
