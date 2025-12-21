"use strict";

import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import { GoogleAuth } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// -------------------------
// Constants
// -------------------------
const BASE_URL = "https://generativelanguage.googleapis.com/v1beta";

// CV context
const CV_CONTEXT = `
Name: Khairul Islam Kakon
Role: Software Engineer
Contact: +88 01923089370, kakon.aiubcse@gmail.com
LinkedIn: https://t.ly/9mS-v
Portfolio: https://is.gd/Z3au4a
GitHub: https://t.ly/2ENJq

Summary:
Tech enthusiast with hands-on experience from multiple internships and probationary periods...

Skills:
JavaScript, Python, C++, Java, PHP, Full Stack Development (Express.js, Django, Next.js, React.js, Laravel, Nest.js), Redux, Tailwind CSS, Shadcn-ui, Prisma, Stripe
Databases: PostgreSQL, MySQL, MongoDB, Firestore
Tools: Visual Studio, Git Bash, Postman, Xampp, R studio

Experience:
Junior Software Developer, Alor Feri Limited (Aug 2025 – present)
Backend Developer Intern, Taskirsview (Jan 2025 – Feb 2025)
Backend Development Intern, Pressply LLC (Jan 2024 – May 2024)

Projects:
KIKQRcard: https://is.gd/77VNPv
Project Booking Management: https://is.gd/lBG66L
E-SHOP Management: https://github.com/kik-ServerCoder/E-SHOP
Project Info Strainer: https://github.com/kakon-aiubcse/info-strainer
`;

// -------------------------
// Chat / Text Generation Route
// -------------------------
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message required" });

  try {
    // 🔑 Use service-account.json directly
    const auth = new GoogleAuth({
      keyFile: "service-account.json",
      scopes: ["https://www.googleapis.com/auth/ai.generate"],
    });

    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();

    if (!accessToken?.token) {
      return res.status(500).json({ error: "Failed to obtain access token" });
    }

    // Build chat prompt
    const prompt = [
      {
        author: "system",
        content: `You are an AI recruiter assistant. Answer ONLY based on the CV below. If information is not in CV, reply: "That information is not available in my CV." Be professional, concise, and friendly.

CV:
${CV_CONTEXT}`
      },
      {
        author: "user",
        content: message
      }
    ];

    // Call Gemini API
    const response = await fetch(
      `${BASE_URL}/models/gemini-2.5-flash:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken.token}`,
        },
        body: JSON.stringify({
          prompt,
          maxOutputTokens: 500,
          temperature: 0.2,
        }),
      }
    );

    const data = await response.json();
    console.log("Gemini API response:", JSON.stringify(data, null, 2));

    const reply = data?.candidates?.[0]?.content || "Sorry, I couldn't generate a response.";
    res.json({ reply });
  } catch (err) {
    console.error("Error in /api/chat:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
});

// -------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
