export const checkStringEquality = (str1: string, str2: string): boolean =>
  str1 === str2;

export const calculateWPM = (charCount: number, time: number): number =>
  charCount / 5 / (time / 60);
