import { Plus, Settings, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Template {
  id: string;
  title: string;
  description: string;
  image: string;
}

const templates: Template[] = [
  {
    id: "1",
    title: "Wine List",
    description: "Сценарий для стиль...",
    image: "🍷",
  },
  {
    id: "2",
    title: "Coffee Shop",
    description: "Ре - варианты...",
    image: "☕",
  },
  {
    id: "3",
    title: "Fashion Look",
    description: "Создать стильный образ...",
    image: "👗",
  },
];

interface RightPanelProps {
  modeColor?: string;
}

export const RightPanel = ({ modeColor = "primary" }: RightPanelProps) => {
  return (
    <div className="hidden lg:flex w-80 bg-card border-l flex-col">
      {/* Chat Section */}
      <div className="border-b p-4">
        <div className="flex items-start gap-3 mb-4">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-primary text-primary-foreground">
              AI
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-semibold text-sm mb-1">
              Привет, Вадим Перфилов
            </div>
            <div className="text-sm text-muted-foreground">
              Что мы создаем сегодня?
            </div>
          </div>
        </div>

        <div className="relative">
          <Input
            placeholder="Начните с одной мысли..."
            className="pr-24 bg-background"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Plus className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Settings className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Wand2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Templates Section */}
      <div className="flex-1 p-4">
        <h3 className="font-semibold mb-3">Шаблоны</h3>
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-3">
            {templates.map((template) => (
              <Card
                key={template.id}
                className="p-3 cursor-pointer hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl">
                    {template.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">
                      {template.title}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {template.description}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
