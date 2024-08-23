import { StoreState } from "@/store";

export const sleep = (delay: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, delay));

export const swap = (arr: number[], i: number, j: number) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

export const markAsDone = (
  num: number,
  setDoneItems: StoreState["setDoneItems"]
) => {
  setDoneItems((prev) => [...prev, num]);
};
