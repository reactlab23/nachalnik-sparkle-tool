import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface AIChatProps {
  placeholder?: string;
  initialMessages?: Message[];
  onSendMessage?: (message: string) => void;
  modeColor?: string;
}

export const AIChat = ({
  placeholder = "Опишите, что хотите изменить...",
  initialMessages = [],
  onSendMessage,
  modeColor = "primary",
}: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    onSendMessage?.(input);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Понял! Вношу изменения...",
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <Card className="flex flex-col h-full">
      <div className={`p-4 border-b bg-[hsl(var(--mode-${modeColor}-soft))]`}>
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg bg-[hsl(var(--mode-${modeColor}))]`}>
            <Sparkles className={`w-4 h-4 text-[hsl(var(--mode-${modeColor}-foreground))]`} />
          </div>
          <div>
            <h3 className="font-semibold">AI-ассистент</h3>
            <p className="text-xs text-muted-foreground">Помогу с редактированием</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.role === "user"
                    ? `bg-[hsl(var(--mode-${modeColor}))] text-[hsl(var(--mode-${modeColor}-foreground))]`
                    : "bg-muted"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder={placeholder}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            size="icon"
            className={`bg-[hsl(var(--mode-${modeColor}))] hover:bg-[hsl(var(--mode-${modeColor}))]/90 text-[hsl(var(--mode-${modeColor}-foreground))]`}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
