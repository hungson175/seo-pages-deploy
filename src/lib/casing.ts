/**
 * Capitalize Vietnamese string with proper title casing.
 * Capitalizes first letter of each word (space or hyphen separated), preserves rest.
 */
export function toTitleCase(input: string): string {
  return input.replace(/(^|[ -])(\w)/g, (_, sep, char) => sep + char.toUpperCase())
}
