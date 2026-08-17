import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

interface ContactPayload {
  name: string;
  phone?: string;
  email: string;
  message: string;
  attachment?: {
    filename: string;
    mimetype: string;
    data: string; // base64
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPass) {
    console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD env vars");
    return res.status(500).json({ error: "Email service is not configured" });
  }

  // Parse body — @vercel/node parses JSON automatically; fall back to manual
  let payload: ContactPayload;
  try {
    if (req.body && typeof req.body === "object") {
      payload = req.body as ContactPayload;
    } else {
      // Raw stream fallback (shouldn't happen with @vercel/node JSON)
      const raw = await new Promise<string>((resolve, reject) => {
        let data = "";
        req.on("data", (chunk: Buffer) => (data += chunk.toString()));
        req.on("end", () => resolve(data));
        req.on("error", reject);
      });
      payload = JSON.parse(raw) as ContactPayload;
    }
  } catch {
    return res.status(400).json({ error: "Invalid request body" });
  }

  const { name, phone, email, message, attachment } = payload;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "name, email and message are required" });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  // 10 MB base64 limit (base64 is ~33% larger than binary, so 10MB binary ≈ 13.3MB base64)
  if (attachment?.data && attachment.data.length > 14 * 1024 * 1024) {
    return res.status(400).json({ error: "Attachment too large (max 10 MB)" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailPass },
  });

  const attachments: nodemailer.SendMailOptions["attachments"] = attachment
    ? [
        {
          filename: attachment.filename,
          content: Buffer.from(attachment.data, "base64"),
          contentType: attachment.mimetype,
        },
      ]
    : [];

  const mailOptions: nodemailer.SendMailOptions = {
    from: `"Portfolio Contact" <${gmailUser}>`,
    to: "kakon.aiubcse@gmail.com",
    replyTo: email,
    subject: `New message from ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e2e8f0;border-radius:8px;">
        <h2 style="color:#6d28d9;margin-top:0;">New Contact Request</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;font-weight:600;width:90px;">Name</td><td style="padding:8px 0;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px 0;font-weight:600;">Email</td><td style="padding:8px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          ${phone ? `<tr><td style="padding:8px 0;font-weight:600;">Phone</td><td style="padding:8px 0;">${escapeHtml(phone)}</td></tr>` : ""}
        </table>
        <hr style="margin:16px 0;border:none;border-top:1px solid #e2e8f0;" />
        <h3 style="margin-top:0;">Message</h3>
        <p style="white-space:pre-wrap;background:#f8fafc;padding:12px;border-radius:6px;">${escapeHtml(message)}</p>
        ${attachments.length > 0 ? `<p style="color:#6b7280;font-size:13px;">📎 ${escapeHtml(attachment!.filename)} attached.</p>` : ""}
      </div>
    `,
    attachments,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    console.error("Nodemailer error:", err);
    return res.status(500).json({ error: "Failed to send email. Please try again later." });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
