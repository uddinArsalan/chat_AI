export type ROLE = "user" | "ai";

export interface Message {
  role: ROLE;
  content: string;
}

export interface Conversation {
  id: string;
  messages: Message[];
}
