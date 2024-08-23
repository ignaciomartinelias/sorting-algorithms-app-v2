import { StoreState, useStore } from "@/store";
import { markAsDone, sleep, swap } from "./utils";

type SortConfig = Pick<
  StoreState,
  | "setItems"
  | "setActiveItems"
  | "setTempItems"
  | "setDoneItems"
  | "speedRef"
  | "abortRef"
>;

const partition = async (
  arr: number[],
  left: number,
  right: number,
  config: SortConfig
): Promise<number | null> => {
  const {
    setItems,
    setActiveItems,
    setTempItems,
    setDoneItems,
    speedRef,
    abortRef,
  } = config;

  if (abortRef.current) return null; // Stop if abortRef is set

  const pivotValue = arr[right];
  let pivotIndex = left;

  for (let i = left; i < right; i++) {
    if (abortRef.current) return null; // Stop if abortRef is set
    setActiveItems([arr[i], pivotValue]);
    await sleep(speedRef.current);

    if (arr[i] < pivotValue) {
      swap(arr, i, pivotIndex);
      pivotIndex++;
      setTempItems([...arr.slice(left, pivotIndex)]);
      setItems([...arr]);
    }
  }

  swap(arr, pivotIndex, right);
  setItems([...arr]);
  setTempItems([]);
  markAsDone(arr[pivotIndex], setDoneItems); // Mark the pivot as done

  return pivotIndex;
};

const sort = async (
  arr: number[],
  left: number,
  right: number,
  config: SortConfig
): Promise<void> => {
  if (left < right) {
    const partitionIndex = await partition(arr, left, right, config);
    if (partitionIndex === null) {
      config.setActiveItems([]); // Ensure active items are cleared
      return;
    }
    await sort(arr, left, partitionIndex - 1, config);
    await sort(arr, partitionIndex + 1, right, config);
  } else if (left === right) {
    markAsDone(arr[left], config.setDoneItems);
  }

  if (left === 0 && right === arr.length - 1) {
    config.setActiveItems([]);
  }
};

export const useQuickSort = () => {
  const {
    items,
    setItems,
    setActiveItems,
    setTempItems,
    setDoneItems,
    speedRef,
    abortRef,
  } = useStore();

  const config: SortConfig = {
    setItems,
    setActiveItems,
    setTempItems,
    setDoneItems,
    speedRef,
    abortRef,
  };

  const handleSort = async () => {
    try {
      await sort([...items], 0, items.length - 1, config);
    } finally {
      if (abortRef.current) {
        config.setDoneItems([]); // Clear done items
      }
      config.abortRef.current = false; // Ensure abortRef is reset
      config.setActiveItems([]); // Clear active items
      config.setTempItems([]); // Clear temp items
    }
  };

  return handleSort;
};
