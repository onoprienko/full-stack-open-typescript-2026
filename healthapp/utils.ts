export const isNotNumber = (argument: any): boolean => {
  if (argument === null || argument === undefined || argument === '') {
    return true;
  }
  return isNaN(Number(argument));
};
