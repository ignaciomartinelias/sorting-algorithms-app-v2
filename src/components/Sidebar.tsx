import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import type { Algorithm } from "@/types";
import { cn } from "@/lib/utils";
import { useStore } from "@/store";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const sizesMap = {
  10: "Small",
  20: "Medium",
  30: "Large",
  40: "XL",
};

const algorithms: Algorithm[] = ["selection", "bubble", "quick"];

const displayModes = ["bars", "numbers"] as const;

export const Sidebar = () => {
  const {
    activeAlgorithm,
    setActiveAlgorithm,
    isPlaying,
    setSize,
    speedRef,
    size: activeSize,
    setDoneItems,
    displayMode,
    setDisplayMode,
  } = useStore();

  const handleSizeChange = (size: number) => {
    if (size !== activeSize) {
      setDoneItems([]);
      setSize(size);
    }
  };

  const handleSpeedChange = (value: number[]) => {
    speedRef.current = 2010 - value[0];
  };

  return (
    <aside className="border-r w-64 p-6 flex flex-col gap-6">
      <div className="grid gap-4">
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
                    "bg-background text-foreground hover:bg-background/90 hover:text-white":
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
        <Separator className="my-2" />
        <div className="grid gap-4">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">Array Size</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoCircledIcon className="w-4 h-4 text-background" />
                </TooltipTrigger>
                <TooltipContent
                  className="w-80 p-4 gap-2 flex flex-col"
                  side="right"
                >
                  <h4 className="font-semibold text-base">Array Size</h4>
                  <p className="text-sm">
                    The size of the array to be sorted. Smaller sizes are faster
                    to visualize. Numbers mode is limited to 20 items (Medium).
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(sizesMap).map(([size, label]) => (
              <Button
                key={size}
                variant="outline"
                className={cn(
                  "flex items-center justify-center w-full gap-2 px-2 relative",
                  {
                    "bg-background text-foreground hover:bg-background/90 hover:text-white":
                      Number(size) === activeSize,
                  }
                )}
                onClick={() => handleSizeChange(Number(size))}
                disabled={
                  isPlaying || (displayMode === "numbers" && Number(size) > 20)
                }
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
        <Separator className="my-2" />

        <div className="grid gap-4">
          <h3 className="font-semibold">Display Mode</h3>
          <div className="grid grid-cols-2 gap-2">
            {displayModes.map((mode) => (
              <Button
                key={mode}
                variant="outline"
                className={cn(
                  "flex items-center justify-center w-full gap-2 px-2 capitalize",
                  {
                    "bg-background text-foreground hover:bg-background/90 hover:text-white":
                      mode === displayMode,
                  }
                )}
                onClick={() => setDisplayMode(mode)}
                disabled={isPlaying}
              >
                {mode}
              </Button>
            ))}
          </div>
        </div>
        <Separator className="my-2" />
        <div className="grid gap-4">
          <h3 className="font-semibold">Speed</h3>
          <Slider
            defaultValue={[1800]}
            min={5}
            max={2000}
            step={1}
            onValueChange={handleSpeedChange}
          />
        </div>
      </div>
    </aside>
  );
};
