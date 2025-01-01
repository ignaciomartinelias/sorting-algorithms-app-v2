import { cn } from "@/utils/cn";
import { Algorithm } from "@/types";
import { useStore } from "@/store";
import { Button } from "../ui/button";
import { Title } from "./Title";
import { sortingAlgorithms } from "@/consts/sortingAlgorithms";

const algorithms = Object.keys(sortingAlgorithms) as Algorithm[];

export const AlgorithmSelector = () => {
  const { activeAlgorithm, setActiveAlgorithm, isPlaying } = useStore();

  return (
    <div className="flex flex-col gap-4">
      <Title title="Sorting Algorithms" />
      <div className="flex flex-col gap-2">
        {algorithms.map((algorithm) => (
          <Button
            key={algorithm}
            variant="ghost"
            className={cn(
              "px-4 py-2 capitalize text-base text-foreground justify-start hover:bg-accent hover:text-foreground h-auto",
              {
                "bg-primary text-background hover:bg-primary/90 hover:text-background":
                  activeAlgorithm === algorithm,
              }
            )}
            onClick={() => setActiveAlgorithm(algorithm)}
            disabled={isPlaying}
          >
            {algorithm} Sort
          </Button>
        ))}
      </div>
    </div>
  );
};
