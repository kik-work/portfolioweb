import React, { lazy, Suspense, useState } from "react";
import { MessageCircleMore } from "lucide-react";

// The chat (dialog, UI kit, CV data) is only needed once the visitor opens it.
const loadChatModal = () => import("./CVChatModal");
const CVChatModal = lazy(() =>
  loadChatModal().then((m) => ({ default: m.CVChatModal }))
);

export const CVChat: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <Suspense fallback={null}>
          <CVChatModal onClose={() => setOpen(false)} />
        </Suspense>
      )}

      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          onPointerEnter={loadChatModal}
          onFocus={loadChatModal}
          aria-label="Open CV chat assistant"
          title="Ask about my CV"
          className="animate-rise-in fixed right-5 bottom-5 z-50 size-14 cursor-pointer overflow-hidden rounded-full p-[2.5px] shadow-float transition-[scale] duration-300 ease-spring hover:scale-110 active:scale-95 md:right-8 md:bottom-8"
          style={{ "--rise-delay": "1200ms" } as React.CSSProperties}
        >
          {/* Spinning spectrum ring */}
          <span aria-hidden="true" className="spectrum-glow absolute -inset-1/2" />
          <span className="relative flex size-full items-center justify-center rounded-full bg-foreground text-background">
            <MessageCircleMore className="size-6" aria-hidden="true" />
          </span>
        </button>
      )}
    </>
  );
};
