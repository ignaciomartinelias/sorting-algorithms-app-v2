import { useStore } from "@/store";
import { sleep } from "./utils";

export const useQuickSort = () => {
  const {
    items,
    setItems,
    setActiveItems,
    setTempItems,
    setDoneItems,
    speedRef,
  } = useStore();

  const swap = (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };

  const markAsDone = (num: number) => {
    setDoneItems((prev) => [...prev, num]);
  };

  const partition = async (
    arr: number[],
    left: number,
    right: number
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
    markAsDone(arr[pivotIndex]);

    return pivotIndex;
  };

  const sort = async (
    arr: number[],
    left = 0,
    right = arr.length - 1
  ): Promise<void> => {
    if (left < right) {
      const partitionIndex = await partition(arr, left, right);
      await sort(arr, left, partitionIndex - 1);
      await sort(arr, partitionIndex + 1, right);
    } else if (left === right) {
      markAsDone(arr[left]);
    }

    if (left === 0 && right === arr.length - 1) {
      setDoneItems([...arr]);
      setActiveItems([]);
    }
  };

  return () => sort([...items]);
};
