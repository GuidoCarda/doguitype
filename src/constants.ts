export const API_URL: string = "https://random-word-api.herokuapp.com/word";

interface modes {
  type: string;
  bounds: Array<number>;
}

export const MODES: Array<modes> = [
  { type: "time", bounds: [15, 30, 60, 120] },
  { type: "words", bounds: [10, 25, 50, 100] },
];

export const THEMES: Array<string> = [
  "theme-1",
  "theme-2",
  "theme-3",
  "theme-4",
];
