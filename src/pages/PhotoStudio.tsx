import { Camera, Upload, Sparkles, Image as ImageIcon, Package, Clock, Cpu } from "lucide-react";
import { ToolsSidebar } from "@/components/studio/ToolsSidebar";
import { RightPanel } from "@/components/studio/RightPanel";
import { ProjectsCarousel } from "@/components/studio/ProjectsCarousel";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

const styles = [
  { id: "white", name: "Белый фон", emoji: "⚪", description: "Классика для маркетплейсов" },
  { id: "interior", name: "В интерьере", emoji: "🏠", description: "Реалистичное окружение" },
  { id: "lifestyle", name: "Lifestyle", emoji: "✨", description: "С людьми в использовании" },
  { id: "creative", name: "Креативный", emoji: "🎨", description: "Уникальные фоны" },
];

const PhotoStudio = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-3 md:px-4 py-2 md:py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3">
              <div
                className="p-1.5 md:p-2 rounded-lg md:rounded-xl"
                style={{
                  background: "var(--gradient-photo)",
                }}
              >
                <Camera className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <h1 className="text-base md:text-xl font-bold">Нейрофотосессия</h1>
            </div>
            
            <div className="hidden md:flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                Шаг 1: Товар
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Clock className="w-3 h-3" />
                ~1 мин
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Cpu className="w-3 h-3" />
                GPU
              </Badge>
              <Badge className="bg-muted text-foreground hover:bg-muted">
                2048 × 2048
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Left Sidebar - Hidden on mobile */}
        <div className="hidden lg:block">
          <ToolsSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col pb-20 md:pb-0">
          <ProjectsCarousel />
          
          <div className="flex-1 px-3 md:px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Генератор контента</h2>
              
              <Card className="p-6 md:p-8 mb-4 md:mb-6 border-2 border-dashed border-[hsl(var(--mode-photo))] bg-[hsl(var(--mode-photo))]/5 text-center cursor-pointer hover:bg-[hsl(var(--mode-photo))]/10 transition-colors">
                <Upload className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 text-[hsl(var(--mode-photo))]" />
                <p className="text-base md:text-lg font-semibold mb-2">Загрузите фото товара</p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Перетащите файл или нажмите для выбора
                </p>
              </Card>

              <div className="mb-4 md:mb-6">
                <label className="block text-sm font-medium mb-3">
                  Выберите стиль фотосессии
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {styles.map((style) => (
                    <Card
                      key={style.id}
                      className="p-4 cursor-pointer hover:border-[hsl(var(--mode-photo))] transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{style.emoji}</span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{style.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {style.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <Card className="p-4 md:p-6">
                <label className="block text-sm font-medium mb-3">
                  Дополнительные детали (опционально)
                </label>
                <Textarea
                  placeholder="Например: поставь товар на деревянный стол рядом с чашкой кофе..."
                  rows={3}
                  className="resize-none text-sm"
                />
              </Card>
            </div>
          </div>
        </div>

        {/* Right Panel - Hidden on mobile */}
        <div className="hidden lg:block">
          <RightPanel modeColor="photo" />
        </div>
      </div>
    </div>
  );
};

export default PhotoStudio;
