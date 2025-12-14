"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircleMore } from "lucide-react";
import { toast } from "sonner";
import { useSendMessageMutation } from "@/services/messageApi";

interface MessageForm {
  name: string;
  email: string;
  message: string;
}

export function MessageDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<MessageForm>({
    name: "",
    email: "",
    message: "",
  });

  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      await sendMessage(form).unwrap();
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
      setOpen(false);
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" aria-label="Send Message">
          <MessageCircleMore className="h-4 w-4 text-primary" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send Message</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-2">
          <Input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
          />
          <Input
            name="email"
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
          />
          <Textarea
            name="message"
            placeholder="Your Message"
            rows={4}
            value={form.message}
            onChange={handleChange}
          />
        </div>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Sending..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
