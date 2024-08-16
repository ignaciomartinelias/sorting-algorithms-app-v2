export function resolveState<T>(
  value: T | ((prevValue: T) => T),
  previousValue: T
): T {
  return typeof value === "function"
    ? (value as (prevValue: T) => T)(previousValue)
    : value;
}
