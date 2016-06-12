export function dateConverter(date) {
  const newDate = date.slice(0, 10)
  const year = newDate.slice(0,4);
  const month = newDate.slice(5,7);
  const day = newDate.slice(8,10);
  return `${month}/${day}/${year}`;
}
