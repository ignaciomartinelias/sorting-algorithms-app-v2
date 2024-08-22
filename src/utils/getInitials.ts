export const getInitials = (str: string) => str.match(/\b(\w)/g)?.join("");
