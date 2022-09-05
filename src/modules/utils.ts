/** Pluralizes a word if its count is not 1 */
export function pluralize(string: string, count: number) {
  return string + (count !== 1 ? 's' : '');
}