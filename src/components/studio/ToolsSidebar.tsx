import { User, Video, Image, Type, Grid, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Tool {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}

const tools: Tool[] = [
  { icon: User, label: "Персонаж", active: true },
  { icon: Video, label: "Видео" },
  { icon: Image, label: "Изображение" },
  { icon: Type, label: "Текст" },
  { icon: Grid, label: "Сетка" },
];

export const ToolsSidebar = () => {
  return (
    <div className="w-16 bg-card border-r flex flex-col items-center py-4 gap-3">
      {tools.map((tool, index) => (
        <Button
          key={index}
          variant="ghost"
          size="icon"
          className={`w-12 h-12 rounded-xl ${
            tool.active
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "hover:bg-muted"
          }`}
        >
          <tool.icon className="w-5 h-5" />
        </Button>
      ))}
    </div>
  );
};
