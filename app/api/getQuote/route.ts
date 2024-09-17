// app/api/getQuote/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '', // Ensure API key is available
});

export async function GET() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a motivational speaker." },
        {
          role: "user",
          content: "Please generate 5 motivational quotes about perseverance.",
        },
      ],
    });

    const quote = response.choices[0]?.message?.content?.trim() ?? "No quote available";
    return NextResponse.json({ quote });
  } catch (error) {
    console.error("Error fetching AI quote:", error);
    return NextResponse.json({ error: "Failed to fetch quote from OpenAI" }, { status: 500 });
  }
}
