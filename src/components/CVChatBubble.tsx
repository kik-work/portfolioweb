import React, { useState } from "react";
import { CVChatModal } from "./CVChatModal";
import { MessageCircleMore } from "lucide-react";

export const CVChat: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <CVChatModal onClose={() => setOpen(false)} />}

      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 bg-primary text-white p-3 md:p-4 xl:p-5 rounded-xl shadow-lg z-50"
        >
          <MessageCircleMore />
        </button>
      )}
    </>
  );
};
