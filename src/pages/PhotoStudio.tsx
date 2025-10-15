import { Camera } from "lucide-react";

const PhotoStudio = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-[hsl(var(--mode-photo))]">
            <Camera className="w-6 h-6 text-[hsl(var(--mode-photo-foreground))]" />
          </div>
          <h1 className="text-3xl font-bold">Нейрофотосессия</h1>
        </div>
        <p className="text-muted-foreground">
          Создание качественных фотографий товаров для маркетплейсов и бизнеса
        </p>
      </div>
    </div>
  );
};

export default PhotoStudio;
