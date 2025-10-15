import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface WizardStepProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  description?: string;
  children: ReactNode;
  onNext?: () => void;
  onPrev?: () => void;
  onSkip?: () => void;
  nextLabel?: string;
  prevLabel?: string;
  canGoNext?: boolean;
  isLastStep?: boolean;
  modeColor?: string;
}

export const WizardStep = ({
  currentStep,
  totalSteps,
  title,
  description,
  children,
  onNext,
  onPrev,
  onSkip,
  nextLabel = "Далее",
  prevLabel = "Назад",
  canGoNext = true,
  isLastStep = false,
  modeColor = "primary",
}: WizardStepProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="flex flex-col h-full">
      {/* Progress */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Шаг {currentStep} из {totalSteps}
          </span>
          {onSkip && (
            <Button variant="ghost" size="sm" onClick={onSkip}>
              Пропустить
            </Button>
          )}
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        {description && (
          <p className="text-muted-foreground mb-6">{description}</p>
        )}
        {children}
      </div>

      {/* Navigation */}
      <div className="border-t p-4 flex gap-3">
        {currentStep > 1 && onPrev && (
          <Button
            variant="outline"
            onClick={onPrev}
            className="flex-1"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            {prevLabel}
          </Button>
        )}
        {onNext && (
          <Button
            onClick={onNext}
            disabled={!canGoNext}
            className={`flex-1 ${
              modeColor !== "primary"
                ? `bg-[hsl(var(--mode-${modeColor}))] hover:bg-[hsl(var(--mode-${modeColor}))]/90 text-[hsl(var(--mode-${modeColor}-foreground))]`
                : ""
            }`}
          >
            {isLastStep ? "Создать" : nextLabel}
            {!isLastStep && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        )}
      </div>
    </div>
  );
};
