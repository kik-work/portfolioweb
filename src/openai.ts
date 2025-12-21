export async function generateGPTResponse(prompt: string): Promise<string> {
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      const errData = await res.json();
      console.error("OpenAI API error:", errData);
      return "❌ Error: Failed to generate response.";
    }

    const data = await res.json();

    // Return the response text
    return data.choices?.[0]?.message?.content ?? "No response";
  } catch (error) {
    console.error("Network error:", error);
    return "❌ Network error";
  }
}
