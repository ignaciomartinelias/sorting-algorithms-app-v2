import { useStore } from "@/store";

import { Badge } from "./ui/badge";
import { sortingAlgorithms } from "@/consts/sortingAlgorithms";
import { ArrowRightIcon, TimerIcon } from "@radix-ui/react-icons";

export const Header = () => {
  const { activeAlgorithm } = useStore();

  return (
    <div className="flex flex-col w-full gap-4 lg:gap-8 text-foreground p-8 md:p-0">
      <h1 className="text-2xl lg:text-4xl font-semibold">
        {sortingAlgorithms[activeAlgorithm].title}
      </h1>
      <p className="lg:text-lg">
        {sortingAlgorithms[activeAlgorithm].longDescription}
      </p>

      <div className="flex flex-col md:flex-row gap-4 bg-accent lg:bg-background p-4 lg:p-0 rounded md:w-fit">
        <h2 className="flex items-center gap-2 font-medium lg:flex-row-reverse lg:bg-accent lg:px-4 lg:py-2 lg:rounded">
          <ArrowRightIcon className="w-4 h-4 hidden lg:inline-block" /> Time
          Complexity <TimerIcon className="w-4 h-4" />
        </h2>
        <div className="flex items-center gap-2 lg:gap-4">
          <Badge className="flex flex-col md:flex-row w-1/3 md:w-auto md:gap-2">
            Best
            <span className="font-normal">
              {sortingAlgorithms[activeAlgorithm].timeComplexity.best}
            </span>
          </Badge>
          <Badge className="flex flex-col md:flex-row w-1/3 md:w-auto md:gap-2">
            Average
            <span className="font-normal">
              {sortingAlgorithms[activeAlgorithm].timeComplexity.average}
            </span>
          </Badge>
          <Badge className="flex flex-col md:flex-row w-1/3 md:w-auto md:gap-2">
            Worst
            <span className="font-normal">
              {sortingAlgorithms[activeAlgorithm].timeComplexity.worst}
            </span>
          </Badge>
        </div>
      </div>
    </div>
  );
};
