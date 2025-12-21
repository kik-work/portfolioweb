import React, { useState } from "react";
import { CVChatModal } from "./CVChatModal";


export const CVChat: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <CVChatModal onClose={() => setOpen(false)} />}

      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg z-50"
      >
        Chat
      </button>
    </>
  );
};
