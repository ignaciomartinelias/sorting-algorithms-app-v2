const MIN = 5;
const MAX = 50;

export const generateUniqueRandomItems = (
  count: number,
  min: number = MIN,
  max: number = MAX
): number[] => {
  const items = new Set<number>();
  while (items.size < count) {
    const randomNum = Math.round(Math.random() * (max - min) + min);
    items.add(randomNum);
  }
  return Array.from(items);
};
