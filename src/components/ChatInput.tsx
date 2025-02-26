import type React from "react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
import { useChatStore } from "@/lib/store/chatStore";
import { useChat } from "@/hooks/useChat";

const ChatInput = () => {
  const { isGenerating } = useChatStore();
  const [message, setMessage] = useState("");
  const { sendMessage } = useChat();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessage(message);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t ">
      <div className="flex items-center space-x-2">
        <Textarea
          value={message}
          rows={5}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          className="flex-1 min-h-[60px] bg-[#1a1a1a] text-[#f8fafc] placeholder-[#64748b] resize-none"
        />
        <Button
          type="submit"
          size="icon"
          disabled={!message.trim()}
          className="bg-[#0060fb] text-white hover:bg-[#2563eb]"
        >
          {isGenerating ? (
            <Loader2 className="w-5 h-5 text-white animate-spin" />
          ) : (
            <Send className="w-5 h-5 text-white" />
          )}
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
