export function formatUnderscoreString(string: string) {
  if (!string) return ''

  return string.slice(0, 1).toUpperCase() + string.slice(1).replace(/_/g, ' ')
}
