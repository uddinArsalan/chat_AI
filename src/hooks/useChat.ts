import { useChatStore } from "@/lib/store/chatStore";
import { fetchGeminiResponse } from "@/lib/geminiApi";

export function useChat() {
  const { currentConversationId, addMessage,setIsGenerating } = useChatStore();

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;
    addMessage(currentConversationId, "user", message);

    try {
      setIsGenerating(true);
      const aiResponse = await fetchGeminiResponse(message);
      addMessage(currentConversationId, "ai", aiResponse);
    } catch (error: unknown) {
      console.log(error);
      addMessage(currentConversationId, "ai", "⚠️ Error fetching response.");
    }finally {
      setIsGenerating(false);
    }
  };

  return { sendMessage };
}
