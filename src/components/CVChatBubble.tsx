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
          onClick={() => setOpen(true)}
          onPointerEnter={loadChatModal}
          onFocus={loadChatModal}
          aria-label="Open CV chat assistant"
          className="fixed bottom-5 right-5 bg-primary text-white p-3 md:p-4 xl:p-5 rounded-xl shadow-lg z-50"
        >
          <MessageCircleMore />
        </button>
      )}
    </>
  );
};
