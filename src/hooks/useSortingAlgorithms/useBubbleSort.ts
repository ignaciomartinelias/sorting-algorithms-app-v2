import { useStore } from "@/store";
import { sleep } from "./utils";

export const useBubbleSort = () => {
  const { items, setItems, setActiveItems, setDoneItems, speedRef } =
    useStore();

  const sort = async () => {
    const result = [...items];

    const swap = (arr: number[], i: number, j: number) => {
      [arr[i], arr[j]] = [arr[j], arr[i]];
    };

    const bubble = async (arr: number[]) => {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
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

    await bubble(result);

    setDoneItems([...result]);
    setActiveItems([]);
  };

  return sort;
};
