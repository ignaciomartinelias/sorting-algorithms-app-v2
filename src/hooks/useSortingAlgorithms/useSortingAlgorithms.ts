import { useBubbleSort } from "./useBubbleSort";
import { useInsertionSort } from "./useInsertionSort";
import { useQuickSort } from "./useQuickSort";
import { useSelectionSort } from "./useSelectionSort";

export const useSortingAlgorithms = () => {
  const selectionSort = useSelectionSort();
  const bubbleSort = useBubbleSort();
  const quickSort = useQuickSort();
  const insertionSort = useInsertionSort();

  return { selectionSort, bubbleSort, quickSort, insertionSort };
};
