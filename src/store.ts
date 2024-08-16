import { create } from "zustand";
import { createRef } from "react";

type Algorithm = "selection" | "bubble" | "quick" | "merge";

export interface StoreState {
  arrayId: number;
  speedRef: React.MutableRefObject<number>;
  abortRef: React.MutableRefObject<boolean>;
  isPlaying: boolean;
  activeAlgorithm: Algorithm;
  size: number;
  displayMode: "bars" | "numbers";
  items: number[];
  activeItems: number[];
  tempItems: number[];
  doneItems: number[];
  setDisplayMode: (displayMode: "bars" | "numbers") => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setActiveAlgorithm: (algorithm: Algorithm) => void;
  setSize: (size: number) => void;
  setItems: (items: number[] | ((prevItems: number[]) => number[])) => void;
  setActiveItems: (
    items: number[] | ((prevItems: number[]) => number[])
  ) => void;
  setTempItems: (items: number[] | ((prevItems: number[]) => number[])) => void;
  setDoneItems: (items: number[] | ((prevItems: number[]) => number[])) => void;
  createNewArray: () => void;
}

const generateUniqueRandomItems = (
  count: number,
  min: number,
  max: number
): number[] => {
  const items = new Set<number>();
  while (items.size < count) {
    const randomNum = Math.round(Math.random() * (max - min) + min);
    items.add(randomNum);
  }
  return Array.from(items);
};

const MIN = 5;
const MAX = 50;

let speedRef = createRef<number>() as React.MutableRefObject<number>; // eslint-disable-line prefer-const
speedRef.current = 200;

let abortRef = createRef<boolean>() as React.MutableRefObject<boolean>; // eslint-disable-line prefer-const
abortRef.current = false;

export const useStore = create<StoreState>((set) => ({
  arrayId: 0,
  speedRef,
  abortRef,
  isPlaying: false,
  activeAlgorithm: "selection",
  displayMode: "bars",
  size: 30,
  items: generateUniqueRandomItems(30, MIN, MAX),
  activeItems: [],
  tempItems: [],
  doneItems: [],
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setDisplayMode: (displayMode) =>
    set((state) => {
      if (displayMode === state.displayMode) {
        return state;
      }

      const newSize =
        displayMode === "numbers" && state.size > 20 ? 20 : state.size;
      return {
        displayMode,
        size: newSize,
        items: generateUniqueRandomItems(newSize, MIN, MAX),
        arrayId: state.arrayId + 1,
      };
    }),
  setActiveAlgorithm: (algorithm) => set({ activeAlgorithm: algorithm }),
  setSize: (size) =>
    set((state) => ({
      size,
      items: generateUniqueRandomItems(size, MIN, MAX),
      arrayId: state.arrayId + 1,
    })),
  setItems: (items) =>
    set((state) => ({
      items: typeof items === "function" ? items(state.items) : items,
    })),
  setActiveItems: (items) =>
    set((state) => ({
      activeItems: typeof items === "function" ? items(state.items) : items,
    })),
  setTempItems: (activeItems) =>
    set((state) => ({
      tempItems:
        typeof activeItems === "function"
          ? activeItems(state.activeItems)
          : activeItems,
    })),
  setDoneItems: (doneItems) =>
    set((state) => ({
      doneItems:
        typeof doneItems === "function"
          ? doneItems(state.doneItems)
          : doneItems,
    })),
  createNewArray: () =>
    set((state) => ({
      items: generateUniqueRandomItems(state.size, MIN, MAX),
      arrayId: state.arrayId + 1,
      activeItems: [],
      tempItems: [],
      doneItems: [],
    })),
}));
