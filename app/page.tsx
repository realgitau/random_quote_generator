"use client";
import { useState } from "react";

interface QuoteResponse {
  quote: string;
}

interface ErrorResponse {
  error: string;
}

export default function Home() {
  const [quote, setQuote] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null); // Reset error state before making the request
    try {
      const response = await fetch('/api/getQuote2'); // Ensure this is the correct endpoint
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: QuoteResponse | ErrorResponse = await response.json();
      
      if ('quote' in data) {
        setQuote(data.quote);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error fetching quote:", error);
      setError("Failed to fetch quote. Please try again later.");
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
        {error && (
          <p className="mt-4 text-xl text-center px-4 text-red-600">{error}</p>
        )}
        {quote && !error && (
          <p className="mt-4 text-xl text-center px-4">{quote}</p>
        )}
      </main>
    </div>
  );
}
