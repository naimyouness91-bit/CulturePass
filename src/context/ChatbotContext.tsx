import React, { createContext, useContext, useState, useCallback } from "react";

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatbotContextType {
  messages: ChatMessage[];
  isOpen: boolean;
  questionsAsked: number;
  addMessage: (text: string, sender: "user" | "bot") => void;
  setIsOpen: (open: boolean) => void;
  clearMessages: () => void;
  incrementQuestionsAsked: () => void;
  hasReachedLimit: () => boolean;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export function ChatbotProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "bot",
      text: "👋 Bonjour / مرحبا! Welcome to CulturePass Support. I can answer up to 5 questions about the app. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [questionsAsked, setQuestionsAsked] = useState(0);

  const addMessage = useCallback((text: string, sender: "user" | "bot") => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender,
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: "1",
        sender: "bot",
        text: "👋 Bonjour / مرحبا! Welcome to CulturePass Support. I can answer up to 5 questions about the app. What would you like to know?",
        timestamp: new Date(),
      },
    ]);
    setQuestionsAsked(0);
  }, []);

  const incrementQuestionsAsked = useCallback(() => {
    setQuestionsAsked((prev) => prev + 1);
  }, []);

  const hasReachedLimit = useCallback(() => {
    return questionsAsked >= 5;
  }, [questionsAsked]);

  return (
    <ChatbotContext.Provider
      value={{
        messages,
        isOpen,
        questionsAsked,
        addMessage,
        setIsOpen,
        clearMessages,
        incrementQuestionsAsked,
        hasReachedLimit,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
}

export function useChatbot() {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error("useChatbot must be used within a ChatbotProvider");
  }
  return context;
}
