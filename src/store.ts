import { create } from "zustand";
import { createRef } from "react";

type Algorithm = "selection" | "bubble" | "quick" | "merge";

export interface StoreState {
  speedRef: React.MutableRefObject<number>;
  isPlaying: boolean;
  activeAlgorithm: Algorithm;
  size: number;
  items: number[];
  activeItems: number[];
  tempItems: number[];
  doneItems: number[];
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

export const useStore = create<StoreState>((set) => ({
  speedRef,
  isPlaying: false,
  activeAlgorithm: "selection",
  size: 30,
  items: generateUniqueRandomItems(30, MIN, MAX),
  activeItems: [],
  tempItems: [],
  doneItems: [],
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setActiveAlgorithm: (algorithm) => set({ activeAlgorithm: algorithm }),
  setSize: (size) =>
    set({ size, items: generateUniqueRandomItems(size, MIN, MAX) }),
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
      activeItems: [],
      tempItems: [],
      doneItems: [],
    })),
}));
