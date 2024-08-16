export type Algorithm = "selection" | "bubble" | "quick" | "merge";
export type DisplayMode = "bars" | "numbers";
export type StateUpdater<T> = (value: T | ((prevValue: T) => T)) => void;
