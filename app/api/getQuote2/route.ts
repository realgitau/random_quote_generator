import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Please generate 5 motivational quotes about perseverance.";

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
];

export async function GET() {
    generationConfig
    safetySettings
    try {
        const result = await model.generateContent(prompt);
        const quote = result.response.text(); // Ensure this is a string

        return new Response(JSON.stringify({ quote }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("Error generating content:", error);
        return new Response(JSON.stringify({ error: "Failed to generate quote" }), {
            headers: { 
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            },
            status: 500
        });
    }
}
