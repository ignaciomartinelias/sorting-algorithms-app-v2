import { PauseIcon, PlayIcon, UpdateIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

import { useSortingAlgorithms } from "@/hooks/useSortingAlgorithms";
import { useStore } from "@/store";
import { SpeedSlider } from "./Sidebar/SpeedSlider";

export const Controls = () => {
  const {
    isPlaying,
    activeAlgorithm,
    createNewArray,
    setIsPlaying,
    abortRef,
    doneItems,
    items,
  } = useStore();
  const { selectionSort, bubbleSort, quickSort } = useSortingAlgorithms();

  const handlePlayAnimation = async () => {
    setIsPlaying(true);
    if (activeAlgorithm === "selection") await selectionSort();
    else if (activeAlgorithm === "bubble") await bubbleSort();
    else if (activeAlgorithm === "quick") await quickSort();
    setIsPlaying(false);
  };

  const handleStopAnimation = () => {
    setIsPlaying(false);
    abortRef.current = true;
  };

  const isDone = doneItems.length === items.length;

  return (
    <div className="flex items-center gap-4">
      <SpeedSlider />
      {isPlaying ? (
        <Button
          variant="ghost"
          className="bg-background border-2 border-accent hover:bg-accent text-base text-foreground hover:text-foreground h-auto px-4 py-2"
          onClick={handleStopAnimation}
        >
          <PauseIcon className="h-4 w-4 mr-2" />
          Stop Animation
        </Button>
      ) : (
        <Button
          variant="ghost"
          className="bg-background border-2 border-accent hover:bg-accent text-base text-foreground hover:text-foreground h-auto px-4 py-2"
          onClick={handlePlayAnimation}
          disabled={isDone}
        >
          <PlayIcon className="h-4 w-4 mr-2" />
          Play Animation
        </Button>
      )}

      <Button
        variant="ghost"
        className="bg-background border-2 border-accent hover:bg-accent text-base text-foreground hover:text-foreground h-auto px-4 py-2"
        onClick={createNewArray}
        disabled={isPlaying}
      >
        <UpdateIcon className="h-4 w-4 mr-2" /> Create new array
      </Button>
    </div>
  );
};
