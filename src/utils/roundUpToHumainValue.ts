export const roundUpToHumainValue = (n: number): number => {
  let power = 1;
  while (n / Math.pow(10, power) > 1) ++power;
  const coefficient = Math.pow(10, power) / 10;
  let humain = coefficient;
  while (humain < n) humain += coefficient;
  return humain;
};
