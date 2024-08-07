export const sleep = (delay: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, delay));
