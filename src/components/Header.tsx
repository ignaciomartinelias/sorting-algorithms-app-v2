import { useStore } from "@/store";
import type { Algorithm } from "@/types";

const sortingAlgorithmsMap: Record<
  Algorithm,
  { title: string; description: string }
> = {
  selection: {
    title: "Selection Sort",
    description:
      "Selection Sort repeatedly finds the minimum element from the unsorted portion and moves it to the beginning. It has a time complexity of O(n²) and is not stable.",
  },
  bubble: {
    title: "Bubble Sort",
    description:
      "Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. It continues until the list is sorted. It has a time complexity of O(n²) and is stable.",
  },
  quick: {
    title: "Quick Sort",
    description:
      "Quick Sort is a divide-and-conquer algorithm that selects a pivot element and partitions the array into two halves, recursively sorting the subarrays. It has an average time complexity of O(n log n) but can degrade to O(n²) in the worst case. It is not stable.",
  },
  merge: {
    title: "Merge Sort",
    description:
      "Merge Sort is a stable, divide-and-conquer algorithm that divides the array into halves, recursively sorts them, and then merges the sorted halves. It has a time complexity of O(n log n) and is stable.",
  },
};

export const Header = () => {
  const { activeAlgorithm } = useStore();

  return (
    <div className="max-w-5xl flex flex-col w-full gap-8">
      <h1 className="text-4xl font-semibold text-foreground">
        {sortingAlgorithmsMap[activeAlgorithm].title}
      </h1>
      <p className="text-lg text-foreground">
        {sortingAlgorithmsMap[activeAlgorithm].description}
      </p>
    </div>
  );
};
