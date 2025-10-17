import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Project {
  id: string;
  title: string;
  thumbnail: string;
}

const recentProjects: Project[] = [
  { id: "1", title: "Wine List", thumbnail: "🍷" },
  { id: "2", title: "Coffee Shop", thumbnail: "☕" },
  { id: "3", title: "Fashion Lookbook", thumbnail: "👗" },
  { id: "4", title: "Travel Blog", thumbnail: "🏝️" },
  { id: "5", title: "Product Showcase", thumbnail: "📦" },
];

export const ProjectsCarousel = () => {
  return (
    <div className="mb-4 md:mb-6">
      <h3 className="font-semibold mb-3 px-4 text-sm md:text-base">Последние проекты</h3>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-3 md:gap-4 px-4">
          {recentProjects.map((project) => (
            <Card
              key={project.id}
              className="flex-shrink-0 w-24 h-20 md:w-32 md:h-24 cursor-pointer hover:bg-muted transition-colors overflow-hidden"
            >
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                <div className="text-2xl md:text-4xl mb-1">{project.thumbnail}</div>
                <div className="text-[10px] md:text-xs font-medium text-center px-2 truncate w-full">
                  {project.title}
                </div>
              </div>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
