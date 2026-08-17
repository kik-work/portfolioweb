import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  User,
  MessageSquare,
  Paperclip,
  Send,
  X,
  Github,
  Linkedin,
  Facebook,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import type { TabPageProps } from "@/components/TapContainer";
import { cn } from "@/lib/utils";

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

interface FormState {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const initialForm: FormState = { name: "", phone: "", email: "", message: "" };

export default function ContactPage(_props: TabPageProps) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!form.message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("File type not supported. Please attach an image, PDF, DOC, or TXT.");
      return;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast.error(`File too large. Maximum size is ${MAX_FILE_SIZE_MB} MB.`);
      return;
    }
    setAttachment(file);
  };

  const removeAttachment = () => {
    setAttachment(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);

    try {
      // Read file as base64 if present
      let attachmentPayload: { filename: string; mimetype: string; data: string } | undefined;
      if (attachment) {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            // result is "data:<mime>;base64,<data>" — strip the prefix
            const result = reader.result as string;
            resolve(result.split(",")[1]);
          };
          reader.onerror = reject;
          reader.readAsDataURL(attachment);
        });
        attachmentPayload = { filename: attachment.name, mimetype: attachment.type, data: base64 };
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          attachment: attachmentPayload,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      toast.success("Message sent! I'll get back to you soon.");
      setForm(initialForm);
      removeAttachment();
      setErrors({});
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to send message.";
      toast.error(msg);
    } finally {
      setSending(false);
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="container mx-auto px-6 py-12">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mb-12"
        >
          <TypographyH1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Get In Touch
          </TypographyH1>
          <TypographyP className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Have a project in mind, a question, need blood? or just want to say hello? Fill
            in the form below and I'll get back to you as soon as possible.
          </TypographyP>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* ── Left info panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <Card className="rounded-2xl shadow-lg h-full">
              <CardContent className="p-6 flex flex-col gap-6 h-full">
                <div>
                  <h2 className="text-lg font-semibold mb-1">Contact Info</h2>
                  <p className="text-sm text-muted-foreground">
                    Reach out directly or use the form.
                  </p>
                </div>

                <div className="flex flex-col gap-4 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Mail className="w-4 h-4" />
                    </span>
                    <a
                      href="mailto:kakon.aiubcse@gmail.com"
                      className="hover:text-primary transition-colors break-all"
                    >
                      kakon.aiubcse@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Phone className="w-4 h-4" />
                    </span>
                    <a
                      href="tel:+8801923089370"
                      className="hover:text-primary transition-colors"
                    >
                      +880 1923089370
                    </a>
                  </div>
                </div>

                {/* Social links */}
                <div className="mt-auto pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-3">Find me on</p>
                  <div className="flex gap-4">
                    <a
                      href="https://github.com/kik-work"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                    >
                      <Github className="w-5 h-5 text-muted-foreground hover:text-primary hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/khairul-islam-kakon-12618222a/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <a
                      href="https://www.facebook.com/share/17XSYL6Q7R/?mibextid=wwXIfr"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5 text-muted-foreground hover:text-primary hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* ── Contact form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <Card className="rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-name" className="text-sm font-medium flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-primary" />
                      Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                    id="contact-name"
                    name="name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={sending}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={cn(
                      "placeholder:text-gray-400", // <- placeholder color here
                      errors.name ? "border-destructive focus-visible:ring-destructive" : ""
                    )}
                  />
                    {errors.name && (
                      <p id="name-error" className="text-xs text-destructive">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-phone" className="text-sm font-medium flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-primary" />
                        Phone
                      </label>
                      <Input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        placeholder="+880 1XXX-XXXXXX"
                        value={form.phone}
                        onChange={handleChange}
                        disabled={sending}
                         className={cn(
                      "placeholder:text-gray-400", // <- placeholder color here
                      errors.name ? "border-destructive focus-visible:ring-destructive" : ""
                    )}
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-email" className="text-sm font-medium flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-primary" />
                        Email <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        disabled={sending}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={cn(
                      "placeholder:text-gray-400", // <- placeholder color here
                      errors.name ? "border-destructive focus-visible:ring-destructive" : ""
                    )}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-xs text-destructive">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-message" className="text-sm font-medium flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-primary" />
                      Message <span className="text-destructive">*</span>
                    </label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      placeholder="Tell me about your project, question, or anything you'd like to discuss..."
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      disabled={sending}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    className={cn(
                      "placeholder:text-gray-400", // <- placeholder color here
                      errors.name ? "border-destructive focus-visible:ring-destructive" : ""
                    )} />
                    {errors.message && (
                      <p id="message-error" className="text-xs text-destructive">{errors.message}</p>
                    )}
                  </div>

                  {/* Attachment */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium flex items-center gap-1.5">
                      <Paperclip className="w-3.5 h-3.5 text-primary" />
                      Attachment
                      <span className="text-xs text-muted-foreground font-normal ml-1">(optional · max {MAX_FILE_SIZE_MB} MB)</span>
                    </label>

                    {attachment ? (
                      <div className="flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-muted text-sm">
                        <Paperclip className="w-4 h-4 text-muted-foreground shrink-0" />
                        <span className="flex-1 truncate text-foreground">{attachment.name}</span>
                        <span className="text-xs text-muted-foreground shrink-0">
                          {(attachment.size / 1024).toFixed(0)} KB
                        </span>
                        <button
                          type="button"
                          onClick={removeAttachment}
                          className="ml-1 text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Remove attachment"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={sending}
                        className="flex items-center gap-2 px-3 py-2 rounded-md border border-dashed border-border hover:border-primary hover:bg-primary/5 text-sm text-muted-foreground hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left"
                      >
                        <Paperclip className="w-4 h-4 shrink-0" />
                        Click to attach a file (image, PDF, DOC, TXT)
                      </button>
                    )}

                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.txt"
                      onChange={handleFileChange}
                      aria-label="File attachment"
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={sending}
                    className="w-full mt-1"
                  >
                    {sending ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                        </svg>
                        Sending…
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
