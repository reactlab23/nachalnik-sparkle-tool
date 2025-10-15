import { NavLink } from "react-router-dom";
import { Video, Film, Camera, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { path: "/projects", icon: FolderOpen, label: "Проекты" },
  { path: "/ugc", icon: Video, label: "UGC", color: "mode-ugc" },
  { path: "/video", icon: Film, label: "Видео", color: "mode-video" },
  { path: "/photo", icon: Camera, label: "Фото", color: "mode-photo" },
];

export const TabBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-all",
                  isActive
                    ? tab.color
                      ? `bg-[hsl(var(--${tab.color}))] text-[hsl(var(--${tab.color}-foreground))]`
                      : "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
