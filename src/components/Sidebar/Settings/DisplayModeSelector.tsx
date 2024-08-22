import { cn } from "@/utils/cn";
import { useStore } from "@/store";
import { Button } from "@/components/ui/button";

const displayModes = ["bars", "numbers"] as const;

export const DisplayModeSelector = () => {
  const {
    displayMode,
    setDisplayMode,
    size,
    setSize,
    isPlaying,
    setDoneItems,
  } = useStore();

  const handleDisplayModeChange = (mode: (typeof displayModes)[number]) => {
    if (mode !== displayMode) {
      setDoneItems([]);
      setDisplayMode(mode);

      if (mode === "numbers" && size > 20) {
        setSize(20);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-medium text-foreground text-lg">Display Mode</h3>
      <div className="grid grid-cols-2 gap-2">
        {displayModes.map((mode) => (
          <Button
            key={mode}
            variant="ghost"
            className={cn(
              "px-4 py-2 capitalize text-white hover:bg-accent hover:text-white h-auto border-2 border-accent",
              {
                "bg-accent hover:bg-accent/90 hover:text-white":
                  mode === displayMode,
              }
            )}
            onClick={() => handleDisplayModeChange(mode)}
            disabled={isPlaying}
          >
            {mode}
          </Button>
        ))}
      </div>
    </div>
  );
};
