import { useState } from "react";
import { generateGPTResponse } from "@/openai";

function GPTAssistant() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const text = await generateGPTResponse(prompt);
      setResponse(text ?? "No response");

    } catch (err) {
      console.error(err);
      setResponse("❌ Error generating content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 700, margin: "0 auto" }}>
      <h1>GPT AI Assistant</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        placeholder="Ask me anything..."
        style={{ width: "100%", padding: 10, borderRadius: 8 }}
      />
      <button
        onClick={handleGenerate}
        disabled={loading || !prompt.trim()}
        style={{
          marginTop: 10,
          padding: "10px 20px",
          backgroundColor: loading ? "#ccc" : "#4A90E2",
          color: "white",
          border: "none",
          borderRadius: 5,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Thinking..." : "Generate Response"}
      </button>

      {response && (
        <div
          style={{
            marginTop: 20,
            padding: 15,
            backgroundColor: "#f9f9f9",
            borderRadius: 8,
            border: "1px solid #eee",
            whiteSpace: "pre-wrap",
          }}
        >
          <strong>Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default GPTAssistant;
