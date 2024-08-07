import { useStore } from "@/store";
import { sleep } from "./utils";

export const useSelectionSort = () => {
  const { items, setItems, setActiveItems, setDoneItems, speedRef } =
    useStore();

  const sort = async () => {
    const result = [...items];

    const findMinIndex = async (
      arr: number[],
      start: number
    ): Promise<number> => {
      let minIndex = start;
      for (let i = start + 1; i < arr.length; i++) {
        setActiveItems([arr[i], arr[minIndex]]);
        await sleep(speedRef.current);
        if (arr[i] < arr[minIndex]) {
          minIndex = i;
        }
      }
      return minIndex;
    };

    for (let i = 0; i < result.length - 1; i++) {
      const minIndex = await findMinIndex(result, i);
      if (minIndex !== i) {
        [result[i], result[minIndex]] = [result[minIndex], result[i]];
      }
      setItems([...result]);
      setDoneItems((prev) => [...prev, result[i]]);
    }

    setDoneItems((prev) => [...prev, result[result.length - 1]]);
    setActiveItems([]);
  };

  return sort;
};
