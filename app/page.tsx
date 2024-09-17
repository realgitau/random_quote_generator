"use client";

import { useState } from "react";

interface QuoteResponse {
  quote: string;
}

export default function Home() {
  const [quote, setQuote] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/getQuote');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: QuoteResponse = await response.json();
      setQuote(data.quote);
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote("Failed to fetch quote. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold mb-4">AI Random Quote Generator</h1>
        <button
          onClick={fetchQuote}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Loading...' : 'Generate Quote'}
        </button>
        {quote && (
          <p className="mt-4 text-xl text-center px-4">{quote}</p>
        )}
      </main>
    </div>
  );
}
