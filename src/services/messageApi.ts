// services/messageApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface MessagePayload {
  name: string;
  email: string;
  message: string;
}

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
  }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation<{ success: boolean }, MessagePayload>({
      query: (body) => ({
        url: "/message",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSendMessageMutation } = messageApi;
