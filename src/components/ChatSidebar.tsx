import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Plus } from "lucide-react";
import { useChatStore } from "@/lib/store/chatStore";

const ChatSidebar = () => {
  const {
    conversations,
    currentConversationId,
    addConversation,
    setActiveConversation,
  } = useChatStore();

  const handleNewChat = () => {
    const newChat = {
      id: crypto.randomUUID(),
      messages: [],
    };
    addConversation(newChat);
  };

  return (
    <div className="h-full flex flex-col bg-[#1a1a1a] border-r border-r-[#333333]">
      <div className="p-4 border-b border-b-[#333333]">
        <div className="mb-4 flex items-center gap-2">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#9333ea]">
            ChatAI
          </h1>
          <span className="text-xs text-[#3b82f6] bg-[#3b82f6]/10 px-2 py-1 rounded-full">
            v2.0
          </span>
        </div>

        <Button
          className="w-full justify-between bg-[#3b82f6] hover:bg-[#2563eb] h-10 transition-all hover:shadow-lg"
          onClick={handleNewChat}
        >
          <span className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            New Chat
          </span>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 px-2 relative">
        <div className="py-4 pr-2 space-y-1">
          <h3 className="text-xs font-semibold text-[#888888] uppercase tracking-wide px-2 mb-2">
            Chat History
          </h3>

          {conversations.map((conversation) => (
            <Button
              key={conversation.id}
              variant="ghost"
              className={`w-full justify-start text-left truncate h-12 rounded-lg
            ${
              conversation.id === currentConversationId
                ? "bg-[#3b82f6]/20 border border-[#3b82f6]/30 text-white font-medium"
                : "text-[#cccccc] hover:bg-[#2d2d2d] hover:text-white bg-transparent"
            }`}
              onClick={() => setActiveConversation(conversation.id)}
            >
              <MessageCircle className="h-4 w-4 mr-2 text-[#3b82f6]" />
              <span className="truncate">
                {conversation.messages.length > 0
                  ? conversation.messages[0]?.content.slice(0, 20) + "..."
                  : "New conversation"}
              </span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar;
