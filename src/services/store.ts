// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { messageApi } from "@/services/messageApi";

export const store = configureStore({
  reducer: {
    [messageApi.reducerPath]: messageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(messageApi.middleware),
});

// ✅ Add these
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
