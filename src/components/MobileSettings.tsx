import { BarChartIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useStore } from "@/store";
import { cn } from "@/utils/cn";
import { DisplayMode } from "@/types";
import { displayModes } from "@/consts/displayModes";
import { sizesMap } from "@/consts/sizesMap";
import { getInitials } from "@/utils/getInitials";

export const MobileSettings = () => {
  const {
    displayMode,
    setDisplayMode,
    setDoneItems,
    setSize,
    size: activeSize,
    isMobile,
    isPlaying,
  } = useStore();

  const handleDisplayModeChange = (mode: DisplayMode) => {
    if (mode !== displayMode) {
      setDoneItems([]);
      setDisplayMode(mode);

      if (
        (mode === "numbers" && activeSize > 20) ||
        (isMobile && activeSize > 10)
      ) {
        setSize(isMobile ? 10 : 20);
      }
    }
  };

  const handleSizeChange = (size: number) => {
    if (size !== activeSize) {
      setDoneItems([]);
      setSize(size);
    }
  };

  return (
    <div className="flex lg:hidden items-center justify-between">
      <div className="rounded flex items-center overflow-hidden">
        {displayModes.map((mode) => (
          <Button
            key={mode}
            className={cn(
              "p-2 border-2 border-r-0 border-accent/50 bg-background rounded-none h-10 w-10 active:bg-accent hover:bg-accent focus:bg-accent last:border-r-2",
              {
                "bg-accent": displayMode === mode,
                "text-xs font-light": mode === "numbers",
              }
            )}
            onClick={() => handleDisplayModeChange(mode)}
            disabled={isPlaying}
          >
            {mode === "bars" ? <BarChartIcon /> : 123}
          </Button>
        ))}
      </div>
      <div className="rounded flex items-center overflow-hidden">
        {Object.entries(sizesMap)
          .filter(([size]) => !isMobile || (isMobile && Number(size) < 40))
          .map(([size, label]) => (
            <Button
              key={label}
              className={cn(
                "p-2 border-2 border-r-0 border-accent/50 bg-background rounded-none w-10 h-10 active:bg-accent hover:bg-accent focus:bg-accent last:border-r-2",
                {
                  "bg-accent": Number(size) === activeSize,
                }
              )}
              onClick={() => handleSizeChange(Number(size))}
              disabled={
                isPlaying ||
                (displayMode === "numbers" &&
                  (Number(size) > 20 || (isMobile && Number(size) > 10)))
              }
            >
              {getInitials(label)}
            </Button>
          ))}
      </div>
    </div>
  );
};
