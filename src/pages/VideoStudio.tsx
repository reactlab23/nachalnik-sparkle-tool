import { Film } from "lucide-react";

const VideoStudio = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-[hsl(var(--mode-video))]">
            <Film className="w-6 h-6 text-[hsl(var(--mode-video-foreground))]" />
          </div>
          <h1 className="text-3xl font-bold">AI-Видеостудия</h1>
        </div>
        <p className="text-muted-foreground">
          Создание полноценных видео с сюжетом, диалогами и уникальной атмосферой
        </p>
      </div>
    </div>
  );
};

export default VideoStudio;
