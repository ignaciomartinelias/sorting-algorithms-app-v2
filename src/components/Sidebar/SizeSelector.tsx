import { cn } from "@/utils/cn";
import { useStore } from "@/store";
import { TooltipInfo } from "./TooltipInfo";
import { Button } from "../ui/button";

const sizesMap = {
  10: "Small",
  20: "Medium",
  30: "Large",
  40: "XL",
};

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
    <div className="grid gap-4">
      <div className="flex items-center gap-2">
        <h3 className="font-semibold">Array Size</h3>
        <TooltipInfo
          title="Array Size"
          content="The size of the array to be sorted. Smaller sizes are faster to visualize. Numbers mode is limited to 20 items (Medium)."
        />
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
  );
};
