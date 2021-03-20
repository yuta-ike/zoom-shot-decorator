const Range = (min: number, max?: number) => {
  if (max == null) {
    max = min
    min = 0
  }
  return Array(max - min)
    .fill(null)
    .map((_, i) => min + i)
}

export default Range
