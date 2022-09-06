/** Pluralizes a word if its count is not 1 (and it doesn't already end in s) */
export function pluralize(string: string, count = 0) {
  return string + (count !== 1 && string[string.length - 1] !== 's' ? 's' : '');
}

/** Creates an asynchronous timeout using a Promise */
export function timeout(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Randomly gives positive or negative sign to a number */
export function randSign(n: number): number {
  return Math.abs(n) * (Math.random() < 0.5 ? -1 : 1);
}