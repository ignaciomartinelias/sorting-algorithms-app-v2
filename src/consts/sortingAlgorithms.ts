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
      "Selection Sort is a basic algorithm that works by repeatedly selecting the smallest unsorted element and moving it to the sorted portion of the list. It’s simple and minimizes swaps, which is beneficial when memory writes are costly. However, with an O(n²) time complexity, it becomes inefficient on larger datasets or nearly sorted arrays, making it more suitable for small collections.",
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
      "Bubble Sort is a straightforward algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if necessary. It’s best suited for nearly sorted arrays, where its best-case time complexity is O(n). Despite its simplicity, Bubble Sort is inefficient for large datasets, as its average and worst-case complexities are both O(n²).",
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
      "Quick Sort is a highly efficient sorting algorithm that works by partitioning an array around a pivot and recursively sorting the sub-arrays. It typically achieves O(n log n) time complexity, making it very fast in practice. However, if the pivot choice is poor, it can degrade to O(n²). Despite this, Quick Sort is widely used due to its superior average performance and minimal memory usage.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
    },
  },
  // merge: {
  //   title: 'Merge Sort',
  //   shortDescription:
  //     'Stable and reliable with consistent performance across various datasets, but requires additional memory for merging.',
  //   longDescription:
  //     'Merge Sort is a stable algorithm with a consistent O(n log n) time complexity, making it reliable for large datasets. It divides the array into smaller sub-arrays, sorts them, and then merges them back together. While it guarantees consistent performance, the need for additional memory during the merge process can be a drawback in memory-limited environments.',
  //   timeComplexity: {
  //     best: 'O(n log n)',
  //     average: 'O(n log n)',
  //     worst: 'O(n log n)',
  //   },
  // },
};
