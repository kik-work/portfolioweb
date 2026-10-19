import { useRef, useState } from "react";
import { toast, Toaster } from "sonner";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import type { TabPageProps } from "@/components/TapContainer";

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
  const fieldError = (key: keyof FormState) =>
    errors[key] ? (
      <p id={`${key}-error`} className="text-sm text-destructive">
        {errors[key]}
      </p>
    ) : null;

  const labelClass = "flex items-center gap-1.5 text-sm font-medium";
  const required = (
    <span aria-hidden="true" className="text-destructive">
      *
    </span>
  );

  return (
    <div className="shell py-24 md:py-32">
      <Toaster richColors position="top-center" />

      <SectionHeader
        id="section-contact-title"
        title="Let's talk."
        subtitle="Say hello."
      >
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
          Have a project in mind, a question, need blood? Or just want to say hello? Fill in the form below and
          I'll get back to you as soon as possible.
        </p>
      </SectionHeader>

      <div className="mt-12 grid gap-4 md:mt-16 md:gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        {/* ── Left info panel ── */}
        <Reveal className="h-full">
          <div className="flex h-full flex-col rounded-3xl bg-card p-7 md:p-9">
            <h3 className="title-lg">Contact info.</h3>
            <p className="mt-2 text-muted-foreground">Reach out directly or use the form.</p>

            <ul className="mt-8 space-y-1">
              {[
                { icon: Mail, label: "Email", value: "kakon.aiubcse@gmail.com", href: "mailto:kakon.aiubcse@gmail.com" },
                { icon: Phone, label: "Phone", value: "+880 1923089370", href: "tel:+8801923089370" },
              ].map(({ icon: Icon, label, value, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="-mx-3 flex items-center gap-4 rounded-2xl p-3 transition-colors duration-300 hover:bg-foreground/[0.04]"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-link/10 text-link">
                      <Icon className="size-[18px]" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-medium text-muted-foreground">{label}</span>
                      <span className="block font-medium break-all">{value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Social links */}
            <div className="mt-auto border-t border-hairline pt-6">
              <p className="mb-3 text-sm text-muted-foreground">Find me on</p>
              <ul className="flex gap-2">
                {[
                  { icon: Github, label: "GitHub", href: "https://github.com/kik-work" },
                  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/khairul-islam-kakon-12618222a/" },
                  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/share/17XSYL6Q7R/?mibextid=wwXIfr" },
                ].map(({ icon: Icon, label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex size-11 items-center justify-center rounded-full bg-foreground/[0.06] text-foreground/80 transition-[background-color,color,translate] duration-300 hover:-translate-y-0.5 hover:bg-foreground/[0.1] hover:text-foreground"
                    >
                      <Icon className="size-[18px]" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* ── Contact form ── */}
        <Reveal delay={100}>
          <div className="rounded-3xl bg-card p-7 md:p-9">
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className={labelClass}>
                  <User className="size-3.5 text-link" aria-hidden="true" />
                  Name {required}
                </label>
                <Input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={sending}
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {fieldError("name")}
              </div>

              {/* Phone + Email row */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-phone" className={labelClass}>
                    <Phone className="size-3.5 text-link" aria-hidden="true" />
                    Phone
                  </label>
                  <Input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+880 1XXX-XXXXXX"
                    value={form.phone}
                    onChange={handleChange}
                    disabled={sending}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-email" className={labelClass}>
                    <Mail className="size-3.5 text-link" aria-hidden="true" />
                    Email {required}
                  </label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    disabled={sending}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {fieldError("email")}
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className={labelClass}>
                  <MessageSquare className="size-3.5 text-link" aria-hidden="true" />
                  Message {required}
                </label>
                <Textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell me about your project, question, or anything you'd like to discuss..."
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  disabled={sending}
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {fieldError("message")}
              </div>

              {/* Attachment */}
              <div className="flex flex-col gap-2">
                <p className={labelClass}>
                  <Paperclip className="size-3.5 text-link" aria-hidden="true" />
                  Attachment
                  <span className="ml-1 text-xs font-normal text-muted-foreground">
                    (optional · max {MAX_FILE_SIZE_MB} MB)
                  </span>
                </p>

                {attachment ? (
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm">
                    <Paperclip className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                    <span className="flex-1 truncate text-foreground">{attachment.name}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {(attachment.size / 1024).toFixed(0)} KB
                    </span>
                    <button
                      type="button"
                      onClick={removeAttachment}
                      className="ml-1 inline-flex size-7 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      aria-label="Remove attachment"
                    >
                      <X className="size-4" aria-hidden="true" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={sending}
                    className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-border px-4 py-3 text-left text-sm text-muted-foreground transition-colors hover:border-link hover:bg-link/5 hover:text-link disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Paperclip className="size-4 shrink-0" aria-hidden="true" />
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
              <Button type="submit" size="lg" variant="violet" disabled={sending} className="mt-2 w-full">
                {sending ? (
                  <span className="flex items-center gap-2">
                    <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                    </svg>
                    Sending…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="size-4" aria-hidden="true" />
                    Send Message
                  </span>
                )}
              </Button>
            </form>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
