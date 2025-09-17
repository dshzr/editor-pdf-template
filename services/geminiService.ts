import { AISuggestions } from '../types';
// FIX: Per @google/genai guidelines, import from '@google/genai' instead of using a global, to fix typing errors.
import { GoogleGenAI, Type } from "@google/genai";

if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
}

// FIX: Per @google/genai guidelines, GoogleGenerativeAI is deprecated. Use GoogleGenAI.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const reviewFormData = async (formData: Record<string, string>): Promise<AISuggestions> => {
    const nonEmptyData = Object.entries(formData)
        .filter(([, value]) => value.trim() !== '')
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {} as Record<string, string>);

    if (Object.keys(nonEmptyData).length === 0) {
        return {};
    }

    const prompt = `
        Review the following form data for typos, grammatical errors, and clarity.
        Only suggest changes if there is a clear error. Do not suggest stylistic changes or rephrase content that is already correct.
        Return a JSON object where each key is a field name from the form data and its value is the suggested correction.
        If no correction is needed for a field, do not include it in the response.

        Form Data:
        ${JSON.stringify(nonEmptyData, null, 2)}
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                // FIX: Simplified responseSchema to return a direct map of suggestions.
                responseSchema: {
                    type: Type.OBJECT,
                    description: "An object where keys are field names from the input and values are the corrected text suggestions.",
                },
            },
        });

        const jsonText = response.text.trim();
        // FIX: Simplified parsing as the response is now the suggestions object directly.
        const result = JSON.parse(jsonText);
        
        return result || {};

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get AI suggestions.");
    }
};