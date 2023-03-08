export const API_URL: string = "https://random-word-api.herokuapp.com/word";

interface Mode {
  type: "time" | "words"; // O directamente "string" por si se añaden más modos
  bounds: number[]; // array de números
}

interface Theme {
  [index: number]: string; // indice numérico y valor string, típico array
}

export const MODES: Mode[] = [
  // array de objetos Mode
  { type: "time", bounds: [15, 30, 60, 120] },
  { type: "words", bounds: [10, 25, 50, 100] },
];

export const THEMES: Theme = ["theme-1", "theme-2", "theme-3", "theme-4"];
