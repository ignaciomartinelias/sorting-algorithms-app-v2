export const MIN_ITEM = 5;
export const MAX_ITEM = 50;

export const generateUniqueRandomItems = (
  count: number,
  min: number = MIN_ITEM,
  max: number = MAX_ITEM
): number[] => {
  const items = new Set<number>();
  while (items.size < count) {
    const randomNum = Math.round(Math.random() * (max - min) + min);
    items.add(randomNum);
  }
  return Array.from(items);
};
