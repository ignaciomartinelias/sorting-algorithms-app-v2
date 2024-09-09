import { create } from "zustand";
import { createRef, MutableRefObject } from "react";
import { generateUniqueRandomItems } from "./utils/generateItems";
import type { Algorithm, DisplayMode, StateUpdater } from "./types";
import { resolveState } from "./utils/stateUpdater";

export type StoreState = {
  isMobile: boolean;
  arrayId: number;
  speedRef: MutableRefObject<number>;
  abortRef: MutableRefObject<boolean>;
  isPlaying: boolean;
  activeAlgorithm: Algorithm;
  size: number;
  displayMode: DisplayMode;
  items: number[];
  activeItems: number[];
  tempItems: number[];
  doneItems: number[];
  setIsMobile: (isMobile: boolean) => void;
  setDisplayMode: (displayMode: DisplayMode) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setActiveAlgorithm: (algorithm: Algorithm) => void;
  setSize: (size: number) => void;
  setItems: StateUpdater<number[]>;
  setActiveItems: StateUpdater<number[]>;
  setTempItems: StateUpdater<number[]>;
  setDoneItems: StateUpdater<number[]>;
  createNewArray: () => void;
};

let speedRef = createRef<number>() as React.MutableRefObject<number>; // eslint-disable-line prefer-const
speedRef.current = 500;

let abortRef = createRef<boolean>() as React.MutableRefObject<boolean>; // eslint-disable-line prefer-const
abortRef.current = false;

export const useStore = create<StoreState>((set) => ({
  isMobile: false,
  arrayId: 0,
  speedRef,
  abortRef,
  isPlaying: false,
  activeAlgorithm: "selection",
  displayMode: "bars",
  size: 30,
  items: generateUniqueRandomItems(30),
  activeItems: [],
  tempItems: [],
  doneItems: [],
  setIsMobile: (isMobile) => set({ isMobile }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setDisplayMode: (displayMode) => set({ displayMode }),
  setActiveAlgorithm: (algorithm) =>
    set((state) => ({
      activeAlgorithm: algorithm,
      items: generateUniqueRandomItems(state.size),
      arrayId: state.arrayId + 1,
      activeItems: [],
      tempItems: [],
      doneItems: [],
    })),
  setSize: (size) =>
    set((state) => ({
      size,
      items: generateUniqueRandomItems(size),
      arrayId: state.arrayId + 1,
    })),
  setItems: (items) =>
    set((state) => ({
      items: resolveState(items, state.items),
    })),
  setActiveItems: (items) =>
    set((state) => ({
      activeItems: resolveState(items, state.activeItems),
    })),
  setTempItems: (activeItems) =>
    set((state) => ({
      tempItems: resolveState(activeItems, state.tempItems),
    })),
  setDoneItems: (doneItems) =>
    set((state) => ({
      doneItems: resolveState(doneItems, state.doneItems),
    })),
  createNewArray: () =>
    set((state) => ({
      items: generateUniqueRandomItems(state.size),
      arrayId: state.arrayId + 1,
      activeItems: [],
      tempItems: [],
      doneItems: [],
    })),
}));
