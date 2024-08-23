import { useStore } from "@/store";
import { sleep, swap } from "./utils";

export const useInsertionSort = () => {
  const {
    setItems,
    setActiveItems,
    items,
    setDoneItems,
    speedRef,
    setTempItems,
    abortRef,
  } = useStore();

  const insertionSort = async () => {
    const arr = [...items];
    setTempItems([arr[0]]);

    for (let i = 1; i < arr.length; i++) {
      if (abortRef.current) break; // Check if animation should stop
      const current = arr[i];
      const subArr = arr.slice(0, i);

      for (let j = subArr.length - 1; j >= 0; j--) {
        if (abortRef.current) break; // Check if animation should stop
        const compared = subArr[j];

        setActiveItems([current, compared]);
        await sleep(speedRef.current);
        if (compared > current) {
          swap(arr, j, j + 1);
          setItems([...arr]);
          setTempItems((prev) => [...prev, current]);
        } else {
          break;
        }
      }
      setTempItems((prev) => [...prev, current]);
    }

    setActiveItems([]);
    setTempItems([]);
    if (abortRef.current) {
      setDoneItems([]);
      abortRef.current = false;
    } else {
      setDoneItems(arr);
    }
  };

  return insertionSort;
};
