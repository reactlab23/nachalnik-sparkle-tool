import { Film, Plus, Sparkles, FileText, Users, Music as MusicIcon, Clock, Cpu } from "lucide-react";
import { ToolsSidebar } from "@/components/studio/ToolsSidebar";
import { RightPanel } from "@/components/studio/RightPanel";
import { ProjectsCarousel } from "@/components/studio/ProjectsCarousel";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

const VideoStudio = () => {
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
                  background: "var(--gradient-video)",
                }}
              >
                <Film className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <h1 className="text-base md:text-xl font-bold">AI-Видеостудия</h1>
            </div>
            
            <div className="hidden md:flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                Шаг 1: Сценарий
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Clock className="w-3 h-3" />
                ~5 мин
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Cpu className="w-3 h-3" />
                GPU
              </Badge>
              <Badge className="bg-muted text-foreground hover:bg-muted">
                1920 × 1080
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                <Card className="p-6 cursor-pointer hover:bg-muted transition-colors border-2 border-[hsl(var(--mode-video))] bg-[hsl(var(--mode-video))]/5">
                  <FileText className="w-8 h-8 text-[hsl(var(--mode-video))] mb-3" />
                  <h3 className="font-semibold mb-2">Создать по сценарию</h3>
                  <p className="text-sm text-muted-foreground">
                    Напишите или загрузите готовый сценарий
                  </p>
                </Card>

                <Card className="p-6 cursor-pointer hover:bg-muted transition-colors">
                  <Sparkles className="w-8 h-8 text-[hsl(var(--mode-video))] mb-3" />
                  <h3 className="font-semibold mb-2">Генерация AI</h3>
                  <p className="text-sm text-muted-foreground">
                    AI создаст сценарий по вашей идее
                  </p>
                </Card>
              </div>

              <Card className="p-4 md:p-6">
                <label className="block text-sm font-medium mb-3">
                  Опишите концепцию вашего видео
                </label>
                <Textarea
                  placeholder="Например: короткометражный фильм о путешествии во времени..."
                  rows={4}
                  className="resize-none mb-4 text-sm"
                />
                
                <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                  <Button className="flex-1" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить персонажей
                  </Button>
                  <Button className="flex-1" variant="outline">
                    <MusicIcon className="w-4 h-4 mr-2" />
                    Выбрать музыку
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Right Panel - Hidden on mobile */}
        <div className="hidden lg:block">
          <RightPanel modeColor="video" />
        </div>
      </div>
    </div>
  );
};

export default VideoStudio;
