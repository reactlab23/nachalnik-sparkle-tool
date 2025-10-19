import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { 
  ArrowLeft, 
  Edit, 
  Sparkles, 
  Image as ImageIcon, 
  Video, 
  AlertCircle,
  Copy,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Scene {
  id: string;
  number: number;
  status: "pending" | "ready" | "error";
  imagePrompt: string;
  videoPrompt: string;
  imageUrl?: string;
}

// Mock data - в реальности будет загружаться через API
const mockProject = {
  id: "1",
  name: "Промо-ролик для Instagram",
  status: "ready" as "draft" | "processing" | "ready" | "error",
  characterDescription: "Молодая девушка, стиль casual",
  settingDescription: "Уютное кафе с большими окнами",
  script: "Привет! Сегодня покажу вам...",
  additionalNotes: "Динамичная музыка",
  voiceDescription: "Энергичный женский голос",
  videoType: "series",
  sceneCount: 3,
  aspectRatio: "9:16",
  imageModel: "seedream",
  referenceImageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400",
};

const mockScenes: Scene[] = [
  {
    id: "1",
    number: 1,
    status: "ready",
    imagePrompt: "A young woman in casual style sitting in a cozy cafe with large windows, natural lighting, modern interior design",
    videoPrompt: "Camera slowly zooms in on the woman as she smiles and waves at the camera",
    imageUrl: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400",
  },
  {
    id: "2",
    number: 2,
    status: "ready",
    imagePrompt: "Close-up of hands holding a coffee cup in a cafe setting, warm tones, aesthetic composition",
    videoPrompt: "Hands lift the coffee cup, steam rising, slow motion effect",
    imageUrl: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400",
  },
  {
    id: "3",
    number: 3,
    status: "pending",
    imagePrompt: "Wide shot of the cafe interior, people in background, golden hour lighting",
    videoPrompt: "Pan across the cafe showing the atmosphere and ambiance",
  },
];

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project] = useState(mockProject);
  const [scenes, setScenes] = useState<Scene[]>(mockScenes);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState<"prompts" | "images" | "video">("prompts");
  const [jobStatus, setJobStatus] = useState("");

  const completedScenes = scenes.filter(s => s.status === "ready").length;
  const progressValue = (completedScenes / scenes.length) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft": return "bg-gray-500";
      case "processing": return "bg-blue-500 animate-pulse";
      case "ready": return "bg-green-500";
      case "error": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Скопировано",
      description: "Промпт скопирован в буфер обмена",
    });
  };

  const handleGeneratePrompts = async () => {
    setIsGenerating(true);
    setCurrentStep("prompts");
    setJobStatus("Анализирую изображение...");
    
    // Симуляция API запроса
    setTimeout(() => {
      setJobStatus("Создаю промпты для сцен...");
    }, 2000);
    
    setTimeout(() => {
      setIsGenerating(false);
      setJobStatus("");
      toast({
        title: "Готово!",
        description: "Промпты для всех сцен созданы",
      });
    }, 4000);
  };

  const handleGenerateImages = async () => {
    setIsGenerating(true);
    setCurrentStep("images");
    setJobStatus("Генерирую изображения...");
    
    // Симуляция генерации изображений
    setTimeout(() => {
      const updatedScenes = scenes.map(scene => ({
        ...scene,
        status: "ready" as const,
        imageUrl: scene.imageUrl || "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400",
      }));
      setScenes(updatedScenes);
      setIsGenerating(false);
      setJobStatus("");
      toast({
        title: "Готово!",
        description: "Все изображения сгенерированы",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <div className="container mx-auto px-4 py-4 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/projects")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            К проектам
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIsEditDialogOpen(true)}>
            <Edit className="w-4 h-4 mr-2" />
            Редактировать
          </Button>
        </div>

        {/* Title & Status */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold">{project.name}</h1>
            <Badge className={`${getStatusColor(project.status)} text-white`}>
              {project.status === "ready" ? "Готов" : 
               project.status === "processing" ? "Обработка" :
               project.status === "draft" ? "Черновик" : "Ошибка"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {completedScenes} из {scenes.length} сцен готово
          </p>
        </div>

        {/* Compact Progress & Controls */}
        <Card className="p-4 mb-4">
          <div className="space-y-4">
            {/* Progress Bar */}
            <div>
              <Progress value={progressValue} className="h-2" />
            </div>
            
            {/* Status Indicator */}
            {jobStatus && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                {jobStatus}
              </div>
            )}

            {/* Control Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <Button 
                onClick={handleGeneratePrompts}
                disabled={isGenerating}
                size="sm"
                className="gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span className="hidden md:inline">Generate</span> Prompts
              </Button>
              <Button 
                onClick={handleGenerateImages}
                disabled={isGenerating || completedScenes === 0}
                size="sm"
                className="gap-2"
              >
                <ImageIcon className="w-4 h-4" />
                <span className="hidden md:inline">Generate</span> Images
              </Button>
              <Button 
                disabled
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Video className="w-4 h-4" />
                <span className="hidden md:inline">Generate</span> Video
              </Button>
            </div>
          </div>
        </Card>

        {/* Error Display */}
        {project.status === "error" && (
          <Card className="p-4 mb-6 border-red-500 bg-red-50 dark:bg-red-950">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-900 dark:text-red-100 mb-1">
                  Произошла ошибка
                </h3>
                <p className="text-sm text-red-700 dark:text-red-300">
                  Не удалось сгенерировать контент. Попробуйте еще раз.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Scenes */}
        <h2 className="text-lg font-bold mb-3">Сцены</h2>

        <Accordion type="single" collapsible className="space-y-2">
          {scenes.map((scene) => (
            <AccordionItem key={scene.id} value={scene.id} className="border rounded-lg bg-card">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <h3 className="text-sm font-semibold">Сцена {scene.number}</h3>
                  <Badge variant={scene.status === "ready" ? "default" : "secondary"} className="text-xs">
                    {scene.status === "ready" ? "Готова" : 
                     scene.status === "pending" ? "Ожидает" : "Ошибка"}
                  </Badge>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="px-4 pb-4">
                <div className="grid md:grid-cols-[1fr,300px] gap-4">
                  {/* Prompts */}
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-medium text-muted-foreground">Image Prompt</label>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => copyToClipboard(scene.imagePrompt)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                      <Textarea
                        value={scene.imagePrompt}
                        readOnly
                        rows={3}
                        className="resize-none text-xs bg-muted/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-medium text-muted-foreground">Video Prompt</label>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => copyToClipboard(scene.videoPrompt)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                      <Textarea
                        value={scene.videoPrompt}
                        readOnly
                        rows={2}
                        className="resize-none text-xs bg-muted/50"
                      />
                    </div>
                  </div>

                  {/* Result */}
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-2 block">Результат</label>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden border">
                      {scene.imageUrl ? (
                        <img 
                          src={scene.imageUrl} 
                          alt={`Сцена ${scene.number}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="w-10 h-10 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редактировать проект</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Название проекта*</label>
              <Input defaultValue={project.name} />
            </div>
            
            <div className="space-y-3 p-3 rounded-lg bg-muted/30">
              <div className="space-y-2">
                <label className="text-sm font-medium">Персонаж</label>
                <Textarea defaultValue={project.characterDescription} rows={2} className="text-sm" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Локация</label>
                <Textarea defaultValue={project.settingDescription} rows={2} className="text-sm" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Сценарий</label>
                <Textarea defaultValue={project.script} rows={3} className="text-sm" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Пожелания</label>
                <Textarea defaultValue={project.additionalNotes} rows={2} className="text-sm" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-xs font-medium">Тип видео</label>
                <Select defaultValue={project.videoType}>
                  <SelectTrigger className="h-9">
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
                <Input type="number" min={1} defaultValue={project.sceneCount} className="h-9" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium">Формат</label>
                <Select defaultValue={project.aspectRatio}>
                  <SelectTrigger className="h-9">
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
                <Select defaultValue={project.imageModel}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seedream">Seedream</SelectItem>
                    <SelectItem value="nanobanana">Nanobanana</SelectItem>
                    <SelectItem value="stable-diffusion">Stable Diffusion</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button className="flex-1" onClick={() => setIsEditDialogOpen(false)}>
                Сохранить
              </Button>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectDetail;
