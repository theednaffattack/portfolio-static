// https://stackoverflow.com/a/7228322/9448010
export function randomInteger(min: number, max: number) {
  if (!Number.isInteger(max)) {
    console.error(`The 'max' argument must be an integer. Received: ${max}`);
  }
  if (!Number.isInteger(min)) {
    console.error(`The 'min' argument must be an integer. Received: ${min}`);
  }
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
