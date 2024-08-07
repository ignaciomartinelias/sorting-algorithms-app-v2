import { StoreState, useStore } from "@/store";
import { sleep } from "./utils";

const swap = (arr: number[], i: number, j: number) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

const markAsDone = (num: number, setDoneItems: StoreState["setDoneItems"]) => {
  setDoneItems((prev) => [...prev, num]);
};

const partition = async (
  arr: number[],
  left: number,
  right: number,
  setItems: StoreState["setItems"],
  setActiveItems: StoreState["setActiveItems"],
  setTempItems: StoreState["setTempItems"],
  setDoneItems: StoreState["setDoneItems"],
  speedRef: StoreState["speedRef"]
): Promise<number> => {
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
  setItems: StoreState["setItems"],
  setActiveItems: StoreState["setActiveItems"],
  setTempItems: StoreState["setTempItems"],
  setDoneItems: StoreState["setDoneItems"],
  speedRef: StoreState["speedRef"]
): Promise<void> => {
  if (left < right) {
    const partitionIndex = await partition(
      arr,
      left,
      right,
      setItems,
      setActiveItems,
      setTempItems,
      setDoneItems,
      speedRef
    );
    await sort(
      arr,
      left,
      partitionIndex - 1,
      setItems,
      setActiveItems,
      setTempItems,
      setDoneItems,
      speedRef
    );
    await sort(
      arr,
      partitionIndex + 1,
      right,
      setItems,
      setActiveItems,
      setTempItems,
      setDoneItems,
      speedRef
    );
  } else if (left === right) {
    markAsDone(arr[left], setDoneItems);
  }

  if (left === 0 && right === arr.length - 1) {
    setDoneItems([...arr]);
    setActiveItems([]);
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
  return () =>
    sort(
      [...items],
      0,
      items.length - 1,
      setItems,
      setActiveItems,
      setTempItems,
      setDoneItems,
      speedRef
    );
};
