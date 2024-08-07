import { useBubbleSort } from "./useBubbleSort";
import { useQuickSort } from "./useQuickSort";
import { useSelectionSort } from "./useSelectionSort";

export const useSortingAlgorithms = () => {
  const selectionSort = useSelectionSort();
  const bubbleSort = useBubbleSort();
  const quickSort = useQuickSort();

  return { selectionSort, bubbleSort, quickSort };
};
