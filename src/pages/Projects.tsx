import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Video, Film, Camera, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Project {
  id: string;
  title: string;
  mode: "ugc" | "video" | "photo";
  status: "draft" | "processing" | "completed";
  date: string;
  thumbnail: string;
}

const mockProjects: Project[] = [
  {
    id: "1",
    title: "Промо-ролик для Instagram",
    mode: "ugc",
    status: "completed",
    date: "2025-10-14",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400",
  },
  {
    id: "2",
    title: "Короткометражный фильм",
    mode: "video",
    status: "processing",
    date: "2025-10-13",
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400",
  },
  {
    id: "3",
    title: "Фото для Wildberries",
    mode: "photo",
    status: "completed",
    date: "2025-10-12",
    thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
  },
];

const modeIcons = {
  ugc: Video,
  video: Film,
  photo: Camera,
};

const modeLabels = {
  ugc: "UGC",
  video: "Видео",
  photo: "Фото",
};

const statusLabels = {
  draft: "Черновик",
  processing: "Обработка",
  completed: "Готово",
};

const Projects = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterMode, setFilterMode] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date-desc");

  const filteredProjects = mockProjects
    .filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
      const matchesMode = filterMode === "all" || p.mode === filterMode;
      return matchesSearch && matchesMode;
    })
    .sort((a, b) => {
      if (sortBy === "date-desc") return b.date.localeCompare(a.date);
      if (sortBy === "date-asc") return a.date.localeCompare(b.date);
      if (sortBy === "name") return a.title.localeCompare(b.title);
      return 0;
    });

  const ModeIcon = (mode: string) => {
    const Icon = modeIcons[mode as keyof typeof modeIcons];
    return Icon ? <Icon className="w-3 h-3" /> : null;
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <div className="container mx-auto px-4 py-4 md:py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-6 gap-3">
          <h1 className="text-2xl md:text-3xl font-bold">Мои проекты</h1>
          <Button onClick={() => navigate("/")} className="gap-2 w-full md:w-auto">
            <Plus className="w-4 h-4" />
            Создать
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 mb-4 md:mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по названию..."
              className="pl-10 text-sm"
            />
          </div>

          <div className="flex gap-2">
            <Select value={filterMode} onValueChange={setFilterMode}>
              <SelectTrigger className="flex-1">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Режим" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все режимы</SelectItem>
                <SelectItem value="ugc">UGC</SelectItem>
                <SelectItem value="video">Видео</SelectItem>
                <SelectItem value="photo">Фото</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Сначала новые</SelectItem>
                <SelectItem value="date-asc">Сначала старые</SelectItem>
                <SelectItem value="name">По имени</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12 md:py-16">
            <div className="mb-3 md:mb-4 text-4xl md:text-6xl">🎨</div>
            <h3 className="text-lg md:text-xl font-semibold mb-2">Проектов пока нет</h3>
            <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
              Создайте свой первый шедевр!
            </p>
            <Button onClick={() => navigate("/")}>Начать создание</Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1.5 right-1.5 md:top-2 md:right-2">
                    <Badge
                      variant="secondary"
                      className={`bg-[hsl(var(--mode-${project.mode}))] text-[hsl(var(--mode-${project.mode}-foreground))] gap-1 text-[10px] md:text-xs px-1.5 md:px-2`}
                    >
                      {ModeIcon(project.mode)}
                      <span className="hidden md:inline">{modeLabels[project.mode]}</span>
                    </Badge>
                  </div>
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="font-semibold mb-1.5 md:mb-2 line-clamp-1 text-sm md:text-base">
                    {project.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground">
                    <span>{new Date(project.date).toLocaleDateString("ru")}</span>
                    <Badge variant="outline" className="text-[10px] md:text-xs">{statusLabels[project.status]}</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
