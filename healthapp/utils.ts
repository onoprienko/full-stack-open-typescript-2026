// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNotNumber = (argument: any): boolean => {
  if (argument === null || argument === undefined || argument === '') {
    return true;
  }
  return isNaN(Number(argument));
};
