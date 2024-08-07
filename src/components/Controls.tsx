import { PlayIcon, StopIcon, UpdateIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

import { useSortingAlgorithms } from "@/hooks/useSortingAlgorithms";
import { useStore } from "@/store";

export const Controls = () => {
  const { isPlaying, activeAlgorithm, reset, setIsPlaying } = useStore();
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
  };

  return (
    <div className="flex gap-8">
      {isPlaying ? (
        <Button variant={"outline"} onClick={handleStopAnimation}>
          <StopIcon className="h-4 w-4 mr-2" />
          Stop Animation
        </Button>
      ) : (
        <Button variant={"outline"} onClick={handlePlayAnimation}>
          <PlayIcon className="h-4 w-4 mr-2" />
          Play Animation
        </Button>
      )}

      <Button variant="outline" onClick={reset}>
        <UpdateIcon className="h-4 w-4 mr-2" /> Reset Animation
      </Button>
    </div>
  );
};
