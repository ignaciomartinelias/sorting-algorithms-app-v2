import type { Algorithm } from "@/types";

type AlgorithmDetails = {
  title: string;
  shortDescription: string;
  longDescription: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
};
export const sortingAlgorithms: Record<Algorithm, AlgorithmDetails> = {
  selection: {
    title: "Selection Sort",
    shortDescription:
      "Efficient for small datasets, minimizing swaps, but performs poorly on larger or nearly sorted datasets due to its O(n²) complexity.",
    longDescription:
      "Selection Sort is straightforward and works well for small datasets. It repeatedly selects the smallest element from the unsorted portion and moves it to the front. While it minimizes swaps, its O(n²) time complexity makes it inefficient for large or nearly sorted datasets.",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
  },
  bubble: {
    title: "Bubble Sort",
    shortDescription:
      "Ideal for nearly sorted datasets, simple to implement, but highly inefficient on large unsorted arrays due to its O(n²) complexity.",
    longDescription:
      "Bubble Sort is simple and ideal for nearly sorted datasets, offering a best-case time complexity of O(n). It repeatedly steps through the list, comparing adjacent elements and swapping them if necessary. However, it’s inefficient for large or unsorted datasets due to its O(n²) complexity.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
  },
  quick: {
    title: "Quick Sort",
    shortDescription:
      "Fast and efficient for most cases, with an average time complexity of O(n log n), though pivot choice can sometimes lead to suboptimal performance.",
    longDescription:
      "Quick Sort is a fast, general-purpose sort with an average time complexity of O(n log n). It works by dividing the array into partitions around a pivot element. For simplicity in animations, this implementation always uses the last element as the pivot, which can sometimes lead to suboptimal performance on already sorted or nearly sorted arrays.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
    },
  },
  //   merge: {
  //     title: "Merge Sort",
  //     shortDescription:
  //       "Stable and reliable with consistent performance across various datasets, but requires additional memory for merging.",
  //     longDescription:
  //       "Merge Sort is a stable and reliable algorithm with a consistent O(n log n) time complexity. It works well on large datasets and is effective regardless of the initial data distribution. However, it requires additional memory for merging, which can be a drawback in memory-constrained environments.",
  //     timeComplexity: {
  //       best: "O(n log n)",
  //       average: "O(n log n)",
  //       worst: "O(n log n)",
  //     },
  //   },
};
