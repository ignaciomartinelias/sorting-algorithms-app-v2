import { useStore } from "@/store";

import { ArrowRightIcon, TimerIcon } from "@radix-ui/react-icons";
import { Badge } from "./ui/badge";
import { sortingAlgorithms } from "@/consts/sortingAlgorithms";

export const Header = () => {
  const { activeAlgorithm } = useStore();

  return (
    <div className="flex flex-col w-full gap-8 text-foreground">
      <h1 className="text-4xl font-semibold">
        {sortingAlgorithms[activeAlgorithm].title}
      </h1>
      <p className="text-lg">
        {sortingAlgorithms[activeAlgorithm].longDescription}
      </p>
      <div className="flex items-center gap-4">
        <h2 className="flex items-center gap-2 bg-accent px-4 py-2 rounded">
          <TimerIcon /> Time Complexity <ArrowRightIcon />
        </h2>
        <Badge>
          Best: {sortingAlgorithms[activeAlgorithm].timeComplexity.best}
        </Badge>
        <Badge>
          Average: {sortingAlgorithms[activeAlgorithm].timeComplexity.average}
        </Badge>
        <Badge>
          Worst: {sortingAlgorithms[activeAlgorithm].timeComplexity.worst}
        </Badge>
      </div>
    </div>
  );
};
