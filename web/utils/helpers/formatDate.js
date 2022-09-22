export default function techtext(date) {
  const d = new Date(date)
  return `${d.getDay()}|${d.getMonth()}|${d.getFullYear()}`
}
