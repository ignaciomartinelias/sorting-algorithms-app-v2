import { StoreState, useStore } from "@/store";
import { sleep } from "./utils";

const swap = (arr: number[], i: number, j: number) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

const markAsDone = (num: number, setDoneItems: StoreState["setDoneItems"]) => {
  setDoneItems((prev) => [...prev, num]);
};

type SortConfig = Pick<
  StoreState,
  "setItems" | "setActiveItems" | "setTempItems" | "setDoneItems" | "speedRef"
>;

const partition = async (
  arr: number[],
  left: number,
  right: number,
  config: SortConfig
): Promise<number> => {
  const { setItems, setActiveItems, setTempItems, setDoneItems, speedRef } =
    config;
  const pivotValue = arr[right];
  let pivotIndex = left;

  for (let i = left; i < right; i++) {
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
  markAsDone(arr[pivotIndex], setDoneItems);

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
    await sort(arr, left, partitionIndex - 1, config);
    await sort(arr, partitionIndex + 1, right, config);
  } else if (left === right) {
    markAsDone(arr[left], config.setDoneItems);
  }

  if (left === 0 && right === arr.length - 1) {
    config.setDoneItems([...arr]);
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
  } = useStore();

  const config: SortConfig = {
    setItems,
    setActiveItems,
    setTempItems,
    setDoneItems,
    speedRef,
  };

  return () => sort([...items], 0, items.length - 1, config);
};
