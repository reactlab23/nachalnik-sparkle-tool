import { useState } from "react";
import { Video, Upload, Sparkles, Music, TrendingUp } from "lucide-react";
import { WizardStep } from "@/components/WizardStep";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AIChat } from "@/components/AIChat";

const platforms = [
  { id: "reels", name: "Stories/Reels", ratio: "9:16", icon: "📱" },
  { id: "feed", name: "Лента", ratio: "1:1", icon: "⬜" },
  { id: "shorts", name: "YouTube Shorts", ratio: "9:16", icon: "▶️" },
];

const styles = [
  { id: "cyberpunk", name: "Киберпанк", emoji: "🌆" },
  { id: "vintage", name: "Теплый винтаж", emoji: "📷" },
  { id: "90s", name: "Эстетика 90-х", emoji: "💿" },
  { id: "minimal", name: "Минимализм", emoji: "⚪" },
];

const UGCGenerator = () => {
  const [step, setStep] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20">
      {!showChat ? (
        <WizardStep
          currentStep={step}
          totalSteps={4}
          title={
            step === 1
              ? "Идея и референс"
              : step === 2
              ? "Формат и платформа"
              : step === 3
              ? "Стиль и настроение"
              : "Создание контента"
          }
          description={
            step === 1
              ? "Загрузите фото или видео, которое вдохновляет вас"
              : step === 2
              ? "Выберите формат для вашей соцсети"
              : step === 3
              ? "Опишите желаемый стиль вашего ролика"
              : "Подождите, создаем ваш UGC-ролик..."
          }
          onNext={() => (step < 4 ? setStep(step + 1) : setShowChat(true))}
          onPrev={() => setStep(step - 1)}
          canGoNext={
            step === 1 ? true : step === 2 ? !!selectedPlatform : step === 3 ? !!selectedStyle || !!prompt : false
          }
          isLastStep={step === 4}
          modeColor="ugc"
        >
          {step === 1 && (
            <div className="space-y-4">
              <Card className="border-2 border-dashed border-[hsl(var(--mode-ugc))] bg-[hsl(var(--mode-ugc-soft))] p-12 text-center cursor-pointer hover:bg-[hsl(var(--mode-ugc-soft))]/80 transition-colors">
                <Upload className="w-12 h-12 mx-auto mb-4 text-[hsl(var(--mode-ugc))]" />
                <p className="text-lg font-semibold mb-2">Загрузите медиа</p>
                <p className="text-sm text-muted-foreground">
                  Перетащите файл или нажмите для выбора
                </p>
              </Card>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-3">или</p>
                <Button variant="outline" className="gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Выбрать из трендов
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-3">
              {platforms.map((platform) => (
                <Card
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedPlatform === platform.id
                      ? "border-2 border-[hsl(var(--mode-ugc))] bg-[hsl(var(--mode-ugc-soft))]"
                      : "hover:border-[hsl(var(--mode-ugc))]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{platform.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-semibold">{platform.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Соотношение {platform.ratio}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3">
                  Опишите стиль текстом
                </label>
                <Textarea
                  placeholder="Например: киберпанк, неоновые огни, динамичный монтаж..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    или выберите пресет
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {styles.map((style) => (
                  <Card
                    key={style.id}
                    onClick={() => {
                      setSelectedStyle(style.id);
                      setPrompt("");
                    }}
                    className={`p-4 cursor-pointer text-center transition-all ${
                      selectedStyle === style.id
                        ? "border-2 border-[hsl(var(--mode-ugc))] bg-[hsl(var(--mode-ugc-soft))]"
                        : "hover:border-[hsl(var(--mode-ugc))]"
                    }`}
                  >
                    <span className="text-3xl block mb-2">{style.emoji}</span>
                    <p className="font-medium text-sm">{style.name}</p>
                  </Card>
                ))}
              </div>

              <Card className="p-4 bg-[hsl(var(--mode-ugc-soft))] border-[hsl(var(--mode-ugc))]">
                <div className="flex gap-3">
                  <Sparkles className="w-5 h-5 text-[hsl(var(--mode-ugc))] flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">AI-подсказка</p>
                    <p className="text-muted-foreground">
                      Попробуйте описать настроение: энергичный, спокойный,
                      креативный...
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[hsl(var(--mode-ugc-soft))] flex items-center justify-center animate-pulse">
                <Music className="w-8 h-8 text-[hsl(var(--mode-ugc))]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Создаем ваш ролик</h3>
              <p className="text-muted-foreground mb-1">Анализируем тренды...</p>
              <p className="text-muted-foreground">Подбираем музыку...</p>
            </div>
          )}
        </WizardStep>
      ) : (
        <div className="container mx-auto px-4 py-6 pb-24">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="p-3 rounded-xl"
              style={{
                background: "var(--gradient-ugc)",
              }}
            >
              <Video className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Результат готов!</h1>
              <p className="text-sm text-muted-foreground">
                Редактируйте через AI-чат
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="aspect-[9/16] bg-muted rounded-2xl mb-4 flex items-center justify-center">
                <p className="text-muted-foreground">Предпросмотр видео</p>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">Скачать</Button>
                <Button variant="outline" className="flex-1">
                  Поделиться
                </Button>
              </div>
            </div>

            <div className="h-[600px]">
              <AIChat
                modeColor="ugc"
                placeholder="Например: сделай небо более ярким..."
                initialMessages={[
                  {
                    id: "1",
                    role: "assistant",
                    content:
                      "Отлично! Ваш UGC-ролик готов. Хотите что-то изменить?",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UGCGenerator;
