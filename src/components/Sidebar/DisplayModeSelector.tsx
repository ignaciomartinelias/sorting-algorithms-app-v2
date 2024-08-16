import { cn } from "@/utils/cn";
import { useStore } from "@/store";
import { Button } from "../ui/button";

const displayModes = ["bars", "numbers"] as const;

export const DisplayModeSelector = () => {
  const { displayMode, setDisplayMode, isPlaying } = useStore();

  return (
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
  );
};
