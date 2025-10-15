import { useNavigate } from "react-router-dom";
import { Video, Film, Camera, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

const modes = [
  {
    id: "ugc",
    title: "UGC-генератор",
    description: "Короткие ролики для соцсетей",
    icon: Video,
    color: "mode-ugc",
    path: "/ugc",
  },
  {
    id: "video",
    title: "AI-Видеостудия",
    description: "Полноценные видео с сюжетом",
    icon: Film,
    color: "mode-video",
    path: "/video",
  },
  {
    id: "photo",
    title: "Нейрофотосессия",
    description: "Качественные фото для бизнеса",
    icon: Camera,
    color: "mode-photo",
    path: "/photo",
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-3">Креативная студия</h1>
          <p className="text-muted-foreground text-lg">
            Выберите режим для создания контента
          </p>
        </div>

        {/* Hub - Mode Cards */}
        <div className="grid gap-6 max-w-2xl mx-auto">
          {modes.map((mode) => (
            <Card
              key={mode.id}
              onClick={() => navigate(mode.path)}
              className="p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-4 rounded-xl bg-[hsl(var(--${mode.color}))]`}
                >
                  <mode.icon className={`w-8 h-8 text-[hsl(var(--${mode.color}-foreground))]`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{mode.title}</h3>
                  <p className="text-muted-foreground">{mode.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
