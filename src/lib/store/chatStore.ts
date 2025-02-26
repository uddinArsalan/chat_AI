import { create } from "zustand";
import { Conversation, ROLE } from "@/types";
import { persist } from "zustand/middleware";

interface ConversationStoreType {
  conversations: Conversation[];
  currentConversationId: string | null;
  isGenerating: boolean;

  addMessage: (
    conversationId: string | null,
    role: ROLE,
    content: string
  ) => void;
  addConversation: (newConversation: Conversation) => void;
  setActiveConversation: (conversationId: string) => void;
  setIsGenerating: (isGenerating: boolean) => void;
}

export const useChatStore = create<ConversationStoreType>()(
  persist(
    (set) => ({
      conversations: [],
      currentConversationId: null,
      isGenerating: false,

      addMessage: (conversationId, role, content) =>
        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === conversationId
              ? { ...conv, messages: [...conv.messages, { role, content }] }
              : conv
          ),
        })),

      addConversation: (newConversation) =>
        set((state) => ({
          conversations: [...state.conversations, newConversation],
          currentConversationId: newConversation.id,
        })),

      setActiveConversation: (conversationId) =>
        set({ currentConversationId: conversationId }),
      setIsGenerating: (isGenerating) => set({ isGenerating }),
    }),

    { name: "chat-store" }
  )
);
