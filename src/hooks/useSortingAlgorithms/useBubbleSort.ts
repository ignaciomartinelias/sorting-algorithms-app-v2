import { StoreState, useStore } from "@/store";
import { sleep } from "./utils";

const swap = (arr: number[], i: number, j: number) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

const bubble = async (
  arr: number[],
  setItems: StoreState["setItems"],
  setActiveItems: StoreState["setActiveItems"],
  setDoneItems: StoreState["setDoneItems"],
  speedRef: StoreState["speedRef"]
) => {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
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
  const { items, setItems, setActiveItems, setDoneItems, speedRef } =
    useStore();

  const sort = async () => {
    const result = [...items];
    await bubble(result, setItems, setActiveItems, setDoneItems, speedRef);
    setDoneItems([...result]);
    setActiveItems([]);
  };

  return sort;
};
