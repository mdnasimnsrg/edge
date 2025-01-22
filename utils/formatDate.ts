export function formatDate(dateArray: any) {
  if (!dateArray) return

  const [year, month, day, hours = 0, minutes = 0, seconds = 0] = dateArray
  const date = new Date(year, month - 1, day, hours, minutes, seconds)

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }

  return date.toLocaleDateString('en-US', options)
}
