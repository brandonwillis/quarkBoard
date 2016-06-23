export function dateConverter(date) {
  const newDate = date.slice(0, 10)
  const year = newDate.slice(0,4);
  const month = newDate.slice(5,7);
  const day = newDate.slice(8,10);
  return `${month}/${day}/${year}`;
}

export function tempConverter(temp) {
  const fah = Math.round((temp - 273.15) * 1.8 + 32)
  return fah + '° F';
}
