import { useStore } from "@/store";
import type { Algorithm } from "@/types";
import { ArrowRightIcon, TimerIcon } from "@radix-ui/react-icons";
import { Badge } from "./ui/badge";

type AlgorithmDetails = {
  title: string;
  description: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
};
const sortingAlgorithmsMap: Record<Algorithm, AlgorithmDetails> = {
  selection: {
    title: "Selection Sort",
    description:
      "Selection Sort is straightforward and works well for small datasets. It repeatedly selects the smallest element from the unsorted portion and moves it to the front. While it minimizes swaps, its O(n²) time complexity makes it inefficient for large or nearly sorted datasets.",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
  },
  bubble: {
    title: "Bubble Sort",
    description:
      "Bubble Sort is simple and ideal for nearly sorted datasets, offering a best-case time complexity of O(n). It repeatedly steps through the list, comparing adjacent elements and swapping them if necessary. However, it’s inefficient for large or unsorted datasets due to its O(n²) complexity.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
  },
  quick: {
    title: "Quick Sort",
    description:
      "Quick Sort is a fast, general-purpose sort with an average time complexity of O(n log n). It works by dividing the array into partitions around a pivot element. For simplicity in animations, this implementation always uses the last element as the pivot, which can sometimes lead to suboptimal performance on already sorted or nearly sorted arrays.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
    },
  },
  merge: {
    title: "Merge Sort",
    description:
      "Merge Sort is a stable and reliable algorithm with a consistent O(n log n) time complexity. It works well on large datasets and is effective regardless of the initial data distribution. However, it requires additional memory for merging, which can be a drawback in memory-constrained environments.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
  },
};

export const Header = () => {
  const { activeAlgorithm } = useStore();

  return (
    <div className="flex flex-col w-full gap-8 text-foreground">
      <h1 className="text-4xl font-semibold">
        {sortingAlgorithmsMap[activeAlgorithm].title}
      </h1>
      <p className="text-lg">
        {sortingAlgorithmsMap[activeAlgorithm].description}
      </p>
      <div className="flex items-center gap-4">
        <h2 className="flex items-center gap-2 bg-accent px-4 py-2 rounded">
          <TimerIcon /> Time Complexity <ArrowRightIcon />
        </h2>
        <Badge>
          Best: {sortingAlgorithmsMap[activeAlgorithm].timeComplexity.best}
        </Badge>
        <Badge>
          Average:{" "}
          {sortingAlgorithmsMap[activeAlgorithm].timeComplexity.average}
        </Badge>
        <Badge>
          Worst: {sortingAlgorithmsMap[activeAlgorithm].timeComplexity.worst}
        </Badge>
      </div>
    </div>
  );
};
