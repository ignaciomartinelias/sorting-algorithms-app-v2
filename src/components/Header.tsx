import { useStore } from "@/store";
import type { Algorithm } from "@/types";
import { ArrowRightIcon, TimerIcon } from "@radix-ui/react-icons";
import { Badge } from "./ui/badge";

type AlgorithmDetails = {
  title: string;
  longDescription: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
};

const sortingAlgorithmsMap: Record<Algorithm, AlgorithmDetails> = {
  selection: {
    title: "Selection Sort",
    longDescription:
      "Selection Sort is most effective on small datasets where simplicity is valued over efficiency. It works well when the cost of swapping elements is high relative to comparing them, as it minimizes the number of swaps. However, it performs poorly on large datasets and nearly sorted arrays, as its O(n²) time complexity leads to slow performance.",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
  },
  bubble: {
    title: "Bubble Sort",
    longDescription:
      "Bubble Sort works best on datasets that are nearly sorted, as its best-case time complexity is O(n) when no swaps are needed. It's easy to implement and understand but is highly inefficient for large or completely unsorted datasets due to its O(n²) average and worst-case time complexity. It is often used for educational purposes or in scenarios where simplicity and code clarity are more important than performance.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
  },
  quick: {
    title: "Quick Sort",
    longDescription:
      "Quick Sort excels in most general-purpose sorting tasks due to its average-case time complexity of O(n log n). It performs best when the pivot selection splits the array into roughly equal halves, such as in randomized or evenly distributed datasets. However, it can perform poorly on datasets that are already sorted or contain many duplicate values, leading to its worst-case time complexity of O(n²). It’s widely used in practice due to its in-place nature and generally good performance.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
    },
  },
  merge: {
    title: "Merge Sort",
    longDescription:
      "Merge Sort is particularly effective on large datasets and linked lists, where its consistent O(n log n) time complexity makes it reliable. It works best on datasets where stability (preserving the relative order of equal elements) is important, and it performs consistently regardless of the input distribution. However, it requires additional memory space proportional to the input size, making it less suitable for memory-constrained environments.",
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
        {sortingAlgorithmsMap[activeAlgorithm].longDescription}
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
