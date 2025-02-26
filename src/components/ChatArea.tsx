import { useChatStore } from "@/lib/store/chatStore";
// import { ScrollArea } from "@/components/ui/scroll-area";

import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect, useMemo, useRef } from "react";
import { Button } from "./ui/button";
import { MessageCircle, Plus } from "lucide-react";

export const ChatArea = () => {
  const {
    conversations,
    currentConversationId,
    isGenerating,
    addConversation,
  } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = useMemo(
    () =>
      conversations.find((conv) => conv.id === currentConversationId)
        ?.messages || [],
    [conversations, currentConversationId]
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  const handleNewChat = () => {
    const newChat = {
      id: crypto.randomUUID(),
      messages: [],
    };
    addConversation(newChat);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      <ScrollArea className="flex-1 overflow-y-auto pr-4">
        <div className="space-y-4 max-w-3xl mx-auto p-4">
          {messages.length > 0 ? (
            <>
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              {isGenerating && (
                <div className="flex justify-start w-full">
                  <div className="flex items-start max-w-[85%] space-x-2">
                    <Avatar>
                      <AvatarImage src="/ai-avatar.png" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg p-3 bg-[#1a1a1a] text-[#f8fafc] w-12 h-12 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-12 ">
              <div className="mb-6 p-5 bg-[#3b82f6]/10 rounded-full">
                <MessageCircle className="h-8 w-8 text-[#3b82f6]" />
              </div>

              <p className="text-center text-2xl font-semibold text-white">
                No messages yet.
              </p>

              <p className="text-center text-lg text-[#cccccc] mt-3 max-w-md">
                Start a conversation by typing a message below.
              </p>

              <Button
                className="mt-6 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-medium px-6 py-2 rounded-lg transition-all hover:shadow-lg"
                onClick={handleNewChat}
              >
                <Plus className="h-4 w-4 mr-2" />
                Start New Chat
              </Button>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="sticky bottom-0 bg-[#0a0a0a] border-t border-[#1f1f1f]">
        <div className="max-w-3xl mx-auto p-4 ">
          <ChatInput />
        </div>
      </div>
    </div>
  );
};
