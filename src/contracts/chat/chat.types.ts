import { Actor } from "../actor";
import type { chatMessages } from "./messages";

export type ChatMessageDto = {
  id: string;
  text: string;
  authorId: string;
  authorName: string;
  createdAt: string;
};

export type ChatCreatePayload = {
  actor: Actor;
  text: string;
};

export type ChatContract = {
  [chatMessages.chatList]: {
    payload: Record<string, never>;
    response: ChatMessageDto[];
  };
  [chatMessages.chatCreate]: {
    payload: ChatCreatePayload;
    response: ChatMessageDto;
  };
};
