import { PauseIcon, PlayIcon, UpdateIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

import { useSortingAlgorithms } from "@/hooks/useSortingAlgorithms";
import { useStore } from "@/store";

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
    <div className="flex gap-8">
      {isPlaying ? (
        <Button variant={"outline"} onClick={handleStopAnimation}>
          <PauseIcon className="h-4 w-4 mr-2" />
          Stop Animation
        </Button>
      ) : (
        <Button
          variant={"outline"}
          onClick={handlePlayAnimation}
          disabled={isDone}
        >
          <PlayIcon className="h-4 w-4 mr-2" />
          Play Animation
        </Button>
      )}

      <Button variant="outline" onClick={createNewArray} disabled={isPlaying}>
        <UpdateIcon className="h-4 w-4 mr-2" /> Create new array
      </Button>
    </div>
  );
};
