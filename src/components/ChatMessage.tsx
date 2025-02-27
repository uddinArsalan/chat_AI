import type React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message } from "@/types";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
// import { ScrollArea } from "./ui/scroll-area";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      } w-full px-4 mb-4`}
    >
      <div
        className={`flex ${
          message.role === "user" ? "flex-row-reverse" : "flex-row"
        } items-start w-full max-w-3xl gap-2`}
      >
        <Avatar className="border flex-shrink-0 mt-1">
          <AvatarImage
            src={
              message.role === "user"
                ? "https://robohash.org/4f8d1a27cccd70691d6c342cab7de8a9?set=set4&bgset=&size=400x400"
                : "https://gravatar.com/avatar/17b13041ead65b2ebcc818da5aa64e8d?s=400&d=robohash&r=x"
            }
            alt={message.role === "user" ? "User" : "AI"}
          />
          <AvatarFallback>
            {message.role === "user" ? "U" : "AI"}
          </AvatarFallback>
        </Avatar>

        <div
          className={`rounded-lg p-3 break-words overflow-hidden ${
            message.role === "user"
              ? "bg-[#3b82f6] text-[#f8fafc]"
              : "bg-[#1a1a1a] text-[#f8fafc]"
          }`}
          style={{
            maxWidth: "calc(100% - 3rem)",
            minWidth: "20%",
          }}
        >
          <div
            className="max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent hover:scrollbar-thumb-gray-400"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#4b5563 transparent",
            }}
          >
            <Markdown
              components={{
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <SyntaxHighlighter
                      {...props}
                      PreTag="div"
                      ref={null}
                      language={match[1]}
                      style={dracula}
                      customStyle={{
                        backgroundColor: "#1e1e1e",
                        borderRadius: "0.5rem",
                        padding: "1rem",
                        margin: "0.5rem 0",
                        overflowX: "auto",
                      }}
                      wrapLongLines
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code
                      {...props}
                      className={className}
                      style={{
                        backgroundColor: "#2d2d2d",
                        color: "#ffffff",
                        padding: "0.2em 0.4em",
                        borderRadius: "0.3em",
                        wordBreak: "break-word",
                      }}
                    >
                      {children}
                    </code>
                  );
                },
                p({ children }) {
                  return (
                    <p className="mb-4 last:mb-0 leading-relaxed">{children}</p>
                  );
                },
                ul({ children }) {
                  return (
                    <ul className="ml-6 list-disc mb-4 space-y-2">
                      {children}
                    </ul>
                  );
                },
                ol({ children }) {
                  return (
                    <ol className="ml-6 list-decimal mb-4 space-y-2">
                      {children}
                    </ol>
                  );
                },
                pre({ children }) {
                  return (
                    <pre className="bg-[#1e1e1e] rounded-lg p-4 my-2 overflow-auto">
                      {children}
                    </pre>
                  );
                },
                a({ href, children }) {
                  return (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 underline transition-colors"
                    >
                      {children}
                    </a>
                  );
                },
                h1({ children }) {
                  return (
                    <h1 className="text-2xl font-bold mb-4 mt-6">{children}</h1>
                  );
                },
                h2({ children }) {
                  return (
                    <h2 className="text-xl font-bold mb-3 mt-5">{children}</h2>
                  );
                },
                blockquote({ children }) {
                  return (
                    <blockquote className="border-l-4 border-gray-500 pl-4 italic text-gray-300 my-4">
                      {children}
                    </blockquote>
                  );
                },
              }}
            >
              {message.content}
            </Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
// [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
