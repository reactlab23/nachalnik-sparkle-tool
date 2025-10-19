import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowLeft, Upload, X, Video, ChevronDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const UGCGenerator = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    characterDescription: "",
    settingDescription: "",
    script: "",
    additionalNotes: "",
    voiceDescription: "",
    videoType: "series",
    sceneCount: 3,
    aspectRatio: "9:16",
    imageModel: "seedream",
  });
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setReferenceImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setReferenceImage(null);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Название проекта обязательно";
    }
    
    if (!referenceImage) {
      newErrors.image = "Референсное изображение обязательно";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }

    // Здесь будет API запрос POST /api/projects
    // const response = await fetch('/api/projects', {
    //   method: 'POST',
    //   body: JSON.stringify({ ...formData, referenceImageUrl: referenceImage })
    // });

    toast({
      title: "Проект создан!",
      description: "Переходим к странице проекта...",
    });

    // Симуляция создания проекта
    setTimeout(() => {
      navigate("/project/1"); // В реальности здесь будет ID из API
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-3 md:px-4 py-2 md:py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3">
              <div
                className="p-1.5 md:p-2 rounded-lg md:rounded-xl"
                style={{
                  background: "var(--gradient-ugc)",
                }}
              >
                <Video className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <h1 className="text-base md:text-xl font-bold">UGC Generator</h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/projects")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">К проектам</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-3xl">
        {/* Form */}
        <Card className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Создать новый проект</h2>
            <p className="text-sm text-muted-foreground">
              Заполните основную информацию для генерации UGC видео
            </p>
          </div>

          {/* Project Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Название проекта <span className="text-destructive">*</span>
            </label>
            <Input
              placeholder="Например: Промо-ролик для Instagram"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Reference Image */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Референсное изображение <span className="text-destructive">*</span>
            </label>
            
            {!referenceImage ? (
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-accent/50 transition-colors">
                  <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm font-medium mb-1">Загрузите изображение</p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG до 10MB
                  </p>
                </div>
              </label>
            ) : (
              <div className="relative rounded-lg overflow-hidden border">
                <img
                  src={referenceImage}
                  alt="Reference"
                  className="w-full max-h-64 object-contain bg-muted"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={handleRemoveImage}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
            {errors.image && (
              <p className="text-sm text-destructive">{errors.image}</p>
            )}
          </div>

          {/* Descriptions - Combined in one card */}
          <div className="space-y-4 p-4 rounded-lg bg-muted/30">
            <h3 className="font-semibold text-sm">Описания</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Персонаж</label>
              <Textarea
                placeholder="Молодая девушка, 25 лет, современный стиль..."
                value={formData.characterDescription}
                onChange={(e) => setFormData({ ...formData, characterDescription: e.target.value })}
                rows={2}
                className="resize-none text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Локация/Сеттинг</label>
              <Textarea
                placeholder="Уютное кафе с большими окнами, дневное освещение..."
                value={formData.settingDescription}
                onChange={(e) => setFormData({ ...formData, settingDescription: e.target.value })}
                rows={2}
                className="resize-none text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Сценарий / Диалог</label>
              <Textarea
                placeholder="Привет! Сегодня я покажу вам мой любимый продукт..."
                value={formData.script}
                onChange={(e) => setFormData({ ...formData, script: e.target.value })}
                rows={3}
                className="resize-none text-sm"
              />
            </div>
          </div>

          {/* Optional Fields - Collapsible */}
          <Collapsible className="space-y-2">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between px-0 hover:bg-transparent">
                <span className="text-sm font-medium">Дополнительные настройки</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Другие пожелания</label>
                <Textarea
                  placeholder="Добавить динамичные переходы, яркие цвета..."
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                  rows={2}
                  className="resize-none text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Описание голоса
                  <span className="text-xs text-muted-foreground ml-2">(для будущих генераций)</span>
                </label>
                <Textarea
                  placeholder="Энергичный женский голос, средний темп речи..."
                  value={formData.voiceDescription}
                  onChange={(e) => setFormData({ ...formData, voiceDescription: e.target.value })}
                  rows={2}
                  className="resize-none text-sm"
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Settings - Compact Grid */}
          <div className="space-y-4 p-4 rounded-lg bg-muted/30">
            <h3 className="font-semibold text-sm">Параметры генерации</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-xs font-medium">Тип видео</label>
                <Select
                  value={formData.videoType}
                  onValueChange={(value) => setFormData({ ...formData, videoType: value })}
                >
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="series">Series</SelectItem>
                    <SelectItem value="continuous">Continuous</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium">Сцены</label>
                <Input
                  type="number"
                  min={1}
                  max={10}
                  value={formData.sceneCount}
                  onChange={(e) => setFormData({ ...formData, sceneCount: parseInt(e.target.value) || 1 })}
                  className="h-9 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium">Формат</label>
                <Select
                  value={formData.aspectRatio}
                  onValueChange={(value) => setFormData({ ...formData, aspectRatio: value })}
                >
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9:16">9:16</SelectItem>
                    <SelectItem value="16:9">16:9</SelectItem>
                    <SelectItem value="1:1">1:1</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium">Модель</label>
                <Select
                  value={formData.imageModel}
                  onValueChange={(value) => setFormData({ ...formData, imageModel: value })}
                >
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seedream">Seedream 4.0</SelectItem>
                    <SelectItem value="nanobanana">Nanobanana</SelectItem>
                    <SelectItem value="stable-diffusion">Stable Diffusion</SelectItem>
                    <SelectItem value="dalle">DALL-E 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              className="flex-1"
              size="lg"
              onClick={handleSubmit}
            >
              Создать проект
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/projects")}
            >
              Отмена
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UGCGenerator;
