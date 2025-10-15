import { Video } from "lucide-react";

const UGCGenerator = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-[hsl(var(--mode-ugc))]">
            <Video className="w-6 h-6 text-[hsl(var(--mode-ugc-foreground))]" />
          </div>
          <h1 className="text-3xl font-bold">UGC-генератор</h1>
        </div>
        <p className="text-muted-foreground">
          Создание коротких роликов для соцсетей с оптимизацией под платформы
        </p>
      </div>
    </div>
  );
};

export default UGCGenerator;
