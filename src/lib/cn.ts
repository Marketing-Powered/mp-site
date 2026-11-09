/* Joins class names, dropping falsy entries. Enough for the conditional
   classes in the Powered Cards components without a merge library. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
