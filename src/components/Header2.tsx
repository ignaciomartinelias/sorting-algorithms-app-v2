import { useStore } from "@/store";

import { Badge } from "./ui/badge";
import { sortingAlgorithms } from "@/consts/sortingAlgorithms";

export const Header = () => {
  const { activeAlgorithm } = useStore();

  return (
    <div className="flex flex-col w-full gap-4 text-foreground p-8">
      <h1 className="text-2xl font-semibold">
        {sortingAlgorithms[activeAlgorithm].title}
      </h1>
      <p>{sortingAlgorithms[activeAlgorithm].longDescription}</p>

      <div className="flex flex-col gap-4 bg-accent p-4 rounded">
        <h2 className="flex items-center gap-2 font-medium">Time Complexity</h2>
        <div className="flex items-center gap-2">
          <Badge className="flex flex-col w-1/3">
            Best
            <span className="font-normal">
              {sortingAlgorithms[activeAlgorithm].timeComplexity.best}
            </span>
          </Badge>
          <Badge className="flex flex-col w-1/3">
            Average
            <span className="font-normal">
              {sortingAlgorithms[activeAlgorithm].timeComplexity.average}
            </span>
          </Badge>
          <Badge className="flex flex-col w-1/3">
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
