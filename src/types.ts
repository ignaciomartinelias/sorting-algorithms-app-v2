export type Algorithm =
  | "selection"
  | "bubble"
  | "quick"
  | "insertion"
  | "merge";
export type DisplayMode = "bars" | "numbers";
export type Size = 10 | 20 | 30 | 40;
export type StateUpdater<T> = (value: T | ((prevValue: T) => T)) => void;
