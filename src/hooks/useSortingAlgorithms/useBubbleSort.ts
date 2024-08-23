import { StoreState, useStore } from "@/store";
import { sleep, swap } from "./utils";

const bubble = async ({
  arr,
  setItems,
  setActiveItems,
  setDoneItems,
  speedRef,
  abortRef,
}: Pick<
  StoreState,
  "abortRef" | "speedRef" | "setItems" | "setActiveItems" | "setDoneItems"
> & { arr: number[] }) => {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (abortRef.current) return; // Check if animation should stop
      setActiveItems([arr[j], arr[j + 1]]);
      await sleep(speedRef.current);

      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        setItems([...arr]);
      }
    }
    setDoneItems((prev) => [...prev, arr[arr.length - 1 - i]]);
  }
};

export const useBubbleSort = () => {
  const { items, setItems, setActiveItems, setDoneItems, speedRef, abortRef } =
    useStore();

  const sort = async () => {
    const result = [...items];
    await bubble({
      arr: result,
      setItems,
      setActiveItems,
      setDoneItems,
      speedRef,
      abortRef,
    });
    if (abortRef.current) {
      setActiveItems([]); // Clear active items
      setDoneItems([]); // Clear done items
      abortRef.current = false; // Reset abortRef
      return;
    }
    setDoneItems([...result]);
    setActiveItems([]);
  };

  return sort;
};
