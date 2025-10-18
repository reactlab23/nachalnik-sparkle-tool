import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, X, Video } from "lucide-react";
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

      <div className="container mx-auto px-4 py-4 md:py-6 max-w-4xl">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold mb-2">Создать новый проект</h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Заполните информацию о вашем UGC видео
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4 md:space-y-6">
          {/* Project Name */}
          <Card className="p-4 md:p-6">
            <label className="text-sm font-medium mb-2 block">
              Название проекта <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Например: Промо-ролик для Instagram"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name}</p>
            )}
          </Card>

          {/* Reference Image */}
          <Card className="p-4 md:p-6">
            <label className="text-sm font-medium mb-3 block">
              Референсное изображение <span className="text-red-500">*</span>
            </label>
            
            {!referenceImage ? (
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="border-2 border-dashed border-primary bg-primary/5 rounded-lg p-8 md:p-12 text-center cursor-pointer hover:bg-primary/10 transition-colors">
                  <Upload className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 text-primary" />
                  <p className="text-sm md:text-base font-semibold mb-2">Загрузите изображение</p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Перетащите файл или нажмите для выбора
                  </p>
                </div>
              </label>
            ) : (
              <div className="relative">
                <img
                  src={referenceImage}
                  alt="Reference"
                  className="w-full rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={handleRemoveImage}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
            {errors.image && (
              <p className="text-sm text-red-500 mt-2">{errors.image}</p>
            )}
          </Card>

          {/* Character Description */}
          <Card className="p-4 md:p-6">
            <label className="text-sm font-medium mb-2 block">
              Описание персонажа
            </label>
            <Textarea
              placeholder="Например: Молодая девушка, 25 лет, современный стиль одежды, дружелюбная улыбка..."
              value={formData.characterDescription}
              onChange={(e) => setFormData({ ...formData, characterDescription: e.target.value })}
              rows={3}
              className="resize-none text-sm"
            />
          </Card>

          {/* Setting Description */}
          <Card className="p-4 md:p-6">
            <label className="text-sm font-medium mb-2 block">
              Описание сеттинга/локации
            </label>
            <Textarea
              placeholder="Например: Уютное кафе с большими окнами, дневное освещение, минималистичный интерьер..."
              value={formData.settingDescription}
              onChange={(e) => setFormData({ ...formData, settingDescription: e.target.value })}
              rows={3}
              className="resize-none text-sm"
            />
          </Card>

          {/* Script / Dialog */}
          <Card className="p-4 md:p-6">
            <label className="text-sm font-medium mb-2 block">
              Сценарий / Диалог
            </label>
            <Textarea
              placeholder="Например: Привет! Сегодня я покажу вам мой любимый продукт..."
              value={formData.script}
              onChange={(e) => setFormData({ ...formData, script: e.target.value })}
              rows={4}
              className="resize-none text-sm"
            />
          </Card>

          {/* Additional Notes */}
          <Card className="p-4 md:p-6">
            <label className="text-sm font-medium mb-2 block">
              Другие пожелания
            </label>
            <Textarea
              placeholder="Например: Добавить динамичные переходы, яркие цвета, энергичную музыку..."
              value={formData.additionalNotes}
              onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
              rows={3}
              className="resize-none text-sm"
            />
          </Card>

          {/* Voice Description */}
          <Card className="p-4 md:p-6">
            <label className="text-sm font-medium mb-2 block">
              Описание голоса
              <span className="text-xs text-muted-foreground ml-2">(для будущих видео-генераций)</span>
            </label>
            <Textarea
              placeholder="Например: Энергичный женский голос, средний темп речи, дружелюбная интонация..."
              value={formData.voiceDescription}
              onChange={(e) => setFormData({ ...formData, voiceDescription: e.target.value })}
              rows={3}
              className="resize-none text-sm"
            />
          </Card>

          {/* Settings */}
          <Card className="p-4 md:p-6">
            <h3 className="font-semibold mb-4 text-sm md:text-base">Настройки генерации</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Тип видео</label>
                <Select
                  value={formData.videoType}
                  onValueChange={(value) => setFormData({ ...formData, videoType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="series">Series (с разными фонами)</SelectItem>
                    <SelectItem value="continuous">Continuous (с одним фоном)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Количество сцен</label>
                <Input
                  type="number"
                  min={1}
                  max={10}
                  value={formData.sceneCount}
                  onChange={(e) => setFormData({ ...formData, sceneCount: parseInt(e.target.value) || 1 })}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Соотношение сторон</label>
                <Select
                  value={formData.aspectRatio}
                  onValueChange={(value) => setFormData({ ...formData, aspectRatio: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9:16">9:16 (вертикальное)</SelectItem>
                    <SelectItem value="16:9">16:9 (горизонтальное)</SelectItem>
                    <SelectItem value="1:1">1:1 (квадрат)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Модель для изображений</label>
                <Select
                  value={formData.imageModel}
                  onValueChange={(value) => setFormData({ ...formData, imageModel: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seedream">Seedream 4.0</SelectItem>
                    <SelectItem value="nanobanana">Nanobanana</SelectItem>
                    <SelectItem value="stable-diffusion">Stable Diffusion XL</SelectItem>
                    <SelectItem value="dalle">DALL-E 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
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
              className="flex-1"
              onClick={() => navigate("/projects")}
            >
              Отмена
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UGCGenerator;
