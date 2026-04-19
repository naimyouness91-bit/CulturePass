import { useEffect, useRef, useState } from "react";
import { X, Send, MessageCircle } from "lucide-react";
import { useChatbot } from "@/context/ChatbotContext";
import {
  PREDEFINED_QUESTIONS,
  findMatchingQuestion,
  getResponseForQuestion,
  getQuestionLabel,
  MAX_QUESTIONS_MESSAGE,
  OUT_OF_SCOPE_MESSAGE,
} from "@/data/limitedChatbotQuestions";
import { useLanguage } from "@/context/LanguageContext";
import { detectLanguage } from "@/utils/languageDetection";
import type { Language } from "@/data/limitedChatbotQuestions";

export function ChatBot() {
  const {
    messages,
    isOpen,
    questionsAsked,
    addMessage,
    setIsOpen,
    clearMessages,
    incrementQuestionsAsked,
    hasReachedLimit,
  } = useChatbot();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isRTL, language } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuickReply = (questionId: string) => {
    const question = PREDEFINED_QUESTIONS.find((q) => q.id === questionId);
    if (!question) return;

    const detectedLanguage = detectLanguage(question.label_fr) as Language;
    const label = getQuestionLabel(question, detectedLanguage);

    addMessage(label, "user");
    setShowQuickReplies(false);
    setIsLoading(true);

    setTimeout(() => {
      const response = getResponseForQuestion(question, detectedLanguage);
      addMessage(response, "bot");
      incrementQuestionsAsked();
      setIsLoading(false);
    }, 800);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // If already reached limit, show message
    if (hasReachedLimit()) {
      const detectedLanguage = detectLanguage(input) as Language;
      addMessage(input, "user");
      addMessage(MAX_QUESTIONS_MESSAGE[detectedLanguage], "bot");
      setInput("");
      return;
    }

    // Add user message
    addMessage(input, "user");
    const userInput = input;
    setInput("");
    setIsLoading(true);
    setShowQuickReplies(false);

    // Detect the language of the user input
    const detectedLanguage = detectLanguage(userInput) as Language;

    // Simulate typing delay
    setTimeout(() => {
      // Find matching question
      const matchingQuestion = findMatchingQuestion(userInput);

      let botResponse: string;

      if (matchingQuestion) {
        botResponse = getResponseForQuestion(matchingQuestion, detectedLanguage);
        incrementQuestionsAsked();
      } else {
        botResponse = OUT_OF_SCOPE_MESSAGE[detectedLanguage];
      }

      addMessage(botResponse, "bot");
      setIsLoading(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-110"
        aria-label="Open chatbot"
        title="CulturePass Support"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-4 right-4 z-40 flex h-[650px] w-full max-w-sm flex-col rounded-2xl bg-background shadow-2xl border border-border ${
        isRTL ? "left-4 right-auto" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-4 rounded-t-2xl">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            CulturePass Support
          </h3>
          <p className="text-xs text-muted-foreground">
            Questions: {questionsAsked}/5
          </p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close chatbot"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs rounded-lg px-4 py-2 text-sm ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground rounded-br-none"
                  : "bg-muted text-foreground rounded-bl-none"
              }`}
            >
              <p className="whitespace-pre-wrap">{message.text}</p>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted text-foreground rounded-lg px-4 py-2 rounded-bl-none">
              <div className="flex gap-1">
                <div
                  className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Quick Reply Buttons */}
        {showQuickReplies && messages.length <= 1 && !hasReachedLimit() && (
          <div className="space-y-2 mt-4">
            <p className="text-xs font-semibold text-muted-foreground px-2">
              {language === "AR" ? "الأسئلة المقترحة:" : "Questions suggérées:"}
            </p>
            {PREDEFINED_QUESTIONS.map((question) => (
              <button
                key={question.id}
                onClick={() => handleQuickReply(question.id)}
                className="w-full text-left px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-sm font-medium text-foreground border border-primary/20 transition-colors text-left"
              >
                {getQuestionLabel(
                  question,
                  language === "AR" ? "AR" : "FR"
                )}
              </button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Status Message */}
      {hasReachedLimit() && (
        <div className="px-4 py-2 bg-yellow-50 border-t border-yellow-200 text-xs text-yellow-900">
          ⚠️ {language === "AR" ? "وصلت إلى الحد الأقصى" : "Limite atteinte"}
        </div>
      )}

      {/* Input */}
      <div className="border-t border-border bg-background/50 p-4 rounded-b-2xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              language === "AR" ? "اسأل سؤالك..." : "Posez votre question..."
            }
            className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
            disabled={isLoading || hasReachedLimit()}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
