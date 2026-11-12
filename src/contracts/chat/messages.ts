export const chatMessages = {
  chatList: "chat.list",
  chatCreate: "chat.create",
} as const;

export type ChatMessagePattern =
  (typeof chatMessages)[keyof typeof chatMessages];
