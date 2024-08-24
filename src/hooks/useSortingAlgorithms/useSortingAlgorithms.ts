import { useBubbleSort } from "./useBubbleSort";
import { useInsertionSort } from "./useInsertionSort";
import { useMergeSort } from "./useMergeSort";
import { useQuickSort } from "./useQuickSort";
import { useSelectionSort } from "./useSelectionSort";

export const useSortingAlgorithms = () => {
  const selectionSort = useSelectionSort();
  const bubbleSort = useBubbleSort();
  const quickSort = useQuickSort();
  const insertionSort = useInsertionSort();
  const mergeSort = useMergeSort();

  return { selectionSort, bubbleSort, quickSort, insertionSort, mergeSort };
};
