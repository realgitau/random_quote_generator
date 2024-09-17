import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '', // Ensure API key is available
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a motivational speaker." },
        {
          role: "user",
          content: "Write a motivational quote to urge people to keep pushing.",
        },
      ],
    });

    const quote = response.choices[0]?.message?.content?.trim() ?? "No quote available";
    res.status(200).json({ quote });
  } catch (error) {
    console.error("Error fetching AI quote:", error);
    res.status(500).json({ error: "Failed to fetch quote from OpenAI" });
  }
}
