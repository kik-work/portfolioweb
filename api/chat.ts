
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

Education, Certifications, Hobbies, Personal Details...
`;

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  const { message } = await req.json();
  if (!message) {
    return new Response(JSON.stringify({ error: "Message is required" }), { status: 400 });
  }

  const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return new Response(JSON.stringify({ error: "Gemini API key not set" }), { status: 500 });
  }

  const prompt = `
You are an AI recruiter assistant for Khairul Islam Kakon's portfolio.

Rules:
- Answer ONLY based on the CV below
- If question is outside CV, respond: "That information is not available in my CV."
- Be professional, concise, friendly.

CV:
${CV_CONTEXT}

User Question:
${message}
`;

  try {
    const response = await fetch(
      "https://generativeai.googleapis.com/v1beta2/models/gemini-1.5-flash:generateText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GEMINI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt,
          temperature: 0.2,
          maxOutputTokens: 500,
        }),
      }
    );

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content || "Sorry, I couldn't generate a response.";

    return new Response(JSON.stringify({ reply }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
