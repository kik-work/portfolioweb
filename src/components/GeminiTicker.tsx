"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";

type TickerData = {
  last: number;
  symbol: string;
};

export function GeminiPriceChart() {
  const [tickers, setTickers] = useState<TickerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [asking, setAsking] = useState(false);

  const symbols = ["btcusd", "ethusd"];

  // Fetch public ticker data from Gemini
  const fetchTickers = async () => {
    try {
      const data = await Promise.all(
        symbols.map(async (symbol) => {
          const res = await fetch(`https://api.gemini.com/v1/pubticker/${symbol}`);
          const json = await res.json();
          return { last: parseFloat(json.last), symbol: symbol.toUpperCase() };
        })
      );
      setTickers(data);
    } catch (err) {
      console.error("Error fetching Gemini tickers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickers();
    const interval = setInterval(fetchTickers, 10000); // update every 10s
    return () => clearInterval(interval);
  }, []);

  // Ask GPT via serverless function
  const askQuestion = async () => {
    if (!question) return;
    setAsking(true);
    setAnswer("Waiting for response...");
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: question }),
      });
      const data = await res.json();
      setAnswer(data.reply);
    } catch (err) {
      setAnswer("Failed to get response.");
    } finally {
      setAsking(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Gemini Price Card */}
      <Card>
        <CardHeader>
          <CardTitle>Gemini Live Prices</CardTitle>
          <CardDescription>BTC/USD and ETH/USD (public API)</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {loading ? (
            <div>Loading Gemini prices…</div>
          ) : (
            tickers.map((ticker) => (
              <motion.div
                key={ticker.symbol}
                className="flex justify-between items-center p-2 border rounded-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="font-bold">{ticker.symbol}</span>
                <span>${ticker.last.toLocaleString()}</span>
              </motion.div>
            ))
          )}
        </CardContent>
      </Card>

      {/* GPT Chat Card */}
      <Card>
        <CardHeader>
          <CardTitle>Ask a Crypto Question</CardTitle>
          <CardDescription>Powered by GPT</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Ask about BTC, ETH..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={askQuestion}
            className={`bg-blue-500 text-white p-2 rounded ${asking ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={asking}
          >
            {asking ? "Asking..." : "Ask"}
          </button>
          {answer && <div className="mt-2 p-2 border rounded bg-gray-50 dark:bg-gray-800">{answer}</div>}
        </CardContent>
      </Card>
    </div>
  );
}
