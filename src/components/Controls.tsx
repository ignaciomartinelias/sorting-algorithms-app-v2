import { PlayIcon, StopIcon, UpdateIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

type Props = {
  isPlaying: boolean;
  handleResetAnimation: VoidFunction;
  handlePlayAnimation: VoidFunction;
  handleStopAnimation: VoidFunction;
};

export const Controls = ({
  isPlaying,
  handleResetAnimation,
  handlePlayAnimation,
  handleStopAnimation,
}: Props) => {
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

      <Button variant="outline" onClick={handleResetAnimation}>
        <UpdateIcon className="h-4 w-4 mr-2" /> Reset Animation
      </Button>
    </div>
  );
};
