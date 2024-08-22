import { cn } from "@/utils/cn";
import { useStore } from "@/store";
import { TooltipInfo } from "./TooltipInfo";
import { Button } from "@/components/ui/button";
import { sizesMap } from "@/consts/sizesMap";

export const SizeSelector = () => {
  const {
    size: activeSize,
    setSize,
    setDoneItems,
    isPlaying,
    displayMode,
  } = useStore();

  const handleSizeChange = (size: number) => {
    if (size !== activeSize) {
      setDoneItems([]);
      setSize(size);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <h3 className="font-medium text-foreground text-lg">Array Size</h3>
        <TooltipInfo
          title="Array Size"
          content="The size of the array to be sorted. Smaller sizes are faster to visualize. Numbers mode is limited to 20 items (Medium)."
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(sizesMap).map(([size, label]) => (
          <Button
            key={size}
            variant="ghost"
            className={cn(
              "px-4 py-2 capitalize text-white hover:bg-accent hover:text-white h-auto border-2 border-accent",
              {
                "bg-accent hover:bg-accent/90 hover:text-white":
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
  );
};
