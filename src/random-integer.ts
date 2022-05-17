// Adapted from: https://stackoverflow.com/a/7228322/9448010
export function randomInteger(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
