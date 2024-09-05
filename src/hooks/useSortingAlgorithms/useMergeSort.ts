import { StoreState, useStore } from "@/store";
import { sleep } from "./utils";

type SortConfig = Pick<
  StoreState,
  | "setItems"
  | "setActiveItems"
  | "setTempItems"
  | "setDoneItems"
  | "speedRef"
  | "abortRef"
>;

const merge = async (
  leftArr: number[],
  rightArr: number[],
  config: SortConfig
): Promise<number[] | null> => {
  const { setItems, setActiveItems, speedRef, abortRef, setTempItems } = config;

  const sortedArray: number[] = [];
  setActiveItems([...leftArr, ...rightArr]);
  await sleep(speedRef.current);

  while (leftArr.length || rightArr.length) {
    if (abortRef.current) {
      setActiveItems([]);
      setTempItems([]);
      return null; // Stop if abortRef is set
    }

    if (leftArr.length && rightArr.length) {
      if (leftArr[0] < rightArr[0]) {
        sortedArray.push(leftArr.shift()!);
      } else {
        sortedArray.push(rightArr.shift()!);
      }
    } else if (leftArr.length) {
      sortedArray.push(leftArr.shift()!);
    } else {
      sortedArray.push(rightArr.shift()!);
    }

    setTempItems([...sortedArray]);
    setActiveItems([...leftArr, ...rightArr]);
    setItems((prev) => {
      const sortedSubArray = [...sortedArray, ...leftArr, ...rightArr];
      const index = prev.findIndex((item) => sortedSubArray.includes(item));
      return [
        ...prev.slice(0, index),
        ...sortedSubArray,
        ...prev.slice(index + sortedSubArray.length),
      ];
    });
    await sleep(speedRef.current);

    if (abortRef.current) {
      setActiveItems([]);
      setTempItems([]);
      return null; // Check abortRef again after sleep
    }
  }

  setActiveItems([]);
  setTempItems([]);
  return sortedArray;
};

const mergeSort = async (
  arr: number[],
  config: SortConfig
): Promise<number[] | null> => {
  if (config.abortRef.current) {
    config.setActiveItems([]);
    config.setTempItems([]);
    return null; // Abort early if abortRef is set
  }

  if (arr.length <= 1) return arr;

  const middleIndex = Math.floor(arr.length / 2);
  const leftArr = await mergeSort(arr.slice(0, middleIndex), config);
  const rightArr = await mergeSort(arr.slice(middleIndex), config);

  if (leftArr === null || rightArr === null) {
    config.setActiveItems([]);
    config.setTempItems([]);
    return null; // Propagate null if aborted
  }

  return await merge(leftArr, rightArr, config);
};

export const useMergeSort = () => {
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

  const sort = async () => {
    const sortedArray = await mergeSort([...items], config);
    if (sortedArray !== null && !abortRef.current) {
      setItems(sortedArray);
      setDoneItems(sortedArray);
    }
    setActiveItems([]);

    if (abortRef.current) {
      abortRef.current = false; // Reset abortRef after sorting is complete
    }
  };

  return sort;
};
