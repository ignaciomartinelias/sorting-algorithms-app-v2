import { cn } from "@/utils/cn";
import { Algorithm } from "@/types";
import { useStore } from "@/store";
import { Button } from "../ui/button";

const algorithms: Algorithm[] = ["selection", "bubble", "quick"];

export const AlgorithmSelector = () => {
  const { activeAlgorithm, setActiveAlgorithm, isPlaying } = useStore();

  return (
    <div className="grid gap-4">
      <h3 className="font-semibold">Algorithms</h3>
      <div className="grid gap-2">
        {algorithms.map((algorithm) => (
          <Button
            key={algorithm}
            variant="outline"
            className={cn(
              "flex items-center justify-center w-full gap-2 px-2 text-center capitalize",
              {
                "bg-foreground text-background hover:bg-foreground/90 hover:text-white":
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
