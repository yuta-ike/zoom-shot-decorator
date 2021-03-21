// [横, たて]
const zoomFrame: Record<number, [number, number][]> = {
  1: [[1, 1]],
  2: [
    [1, 2],
    [2, 1],
  ],
  3: [
    [2, 2],
    [3, 1],
  ],
  4: [[2, 2]],
  5: [
    [3, 2],
    [2, 3],
  ],
  6: [
    [2, 3],
    [3, 2],
  ],
  7: [
    [3, 3],
    [4, 2],
  ],
  8: [
    [3, 3],
    [4, 2],
  ],
  9: [[3, 3]],
  10: [
    [4, 3],
    [3, 4],
  ],
  11: [
    [4, 3],
    [3, 4],
  ],
  12: [
    [4, 3],
    [3, 4],
  ],
  13: [
    [4, 4],
    [5, 3],
  ],
  14: [
    [4, 4],
    [5, 3],
  ],
  15: [
    [4, 4],
    [5, 3],
  ],
  16: [[4, 4]],
  17: [
    [5, 4],
    [4, 5],
  ],
  18: [
    [5, 4],
    [4, 5],
  ],
  19: [
    [5, 4],
    [4, 5],
  ],
  20: [
    [5, 4],
    [4, 5],
  ],
  21: [[5, 5]],
  22: [[5, 5]],
  23: [[5, 5]],
  24: [[5, 5]],
  25: [[5, 5]],
  26: [
    [6, 5],
    [5, 6],
  ],
  27: [
    [6, 5],
    [5, 6],
  ],
  28: [
    [6, 5],
    [5, 6],
  ],
  29: [
    [6, 5],
    [5, 6],
  ],
  30: [
    [6, 5],
    [5, 6],
  ],
  31: [
    [6, 6],
    [5, 7],
    [7, 5],
  ],
  32: [
    [6, 6],
    [5, 7],
    [7, 5],
  ],
  33: [
    [6, 6],
    [5, 7],
    [7, 5],
  ],
  34: [
    [6, 6],
    [5, 7],
    [7, 5],
  ],
  35: [
    [6, 6],
    [5, 7],
    [7, 5],
  ],
  36: [
    [6, 6],
    [5, 7],
    [7, 5],
  ],
  37: [
    [7, 6],
    [6, 7],
  ],
  38: [
    [7, 6],
    [6, 7],
  ],
  39: [
    [7, 6],
    [6, 7],
  ],
  40: [
    [7, 6],
    [6, 7],
  ],
  41: [
    [7, 6],
    [6, 7],
  ],
  42: [
    [7, 6],
    [6, 7],
  ],
  43: [[7, 7]],
  44: [[7, 7]],
  45: [[7, 7]],
  46: [[7, 7]],
  47: [[7, 7]],
  48: [[7, 7]],
  49: [[7, 7]],
}

export type GuideTemplate = {
  count: number
  row: number
  col: number
  bottom: number
  offset: number
}

export const calcTemplate = (
  memberCount: number,
  rowCount: number,
  colCount: number,
) => {
  const bottom = memberCount - colCount * (rowCount - 1)
  return {
    count: memberCount,
    row: rowCount,
    col: colCount,
    bottom,
    offset: colCount - bottom,
  }
}

export const getMajorTemplate = (memberCount: number) => {
  const templates = zoomFrame[memberCount]
  return templates.map(([row, col]) => calcTemplate(memberCount, row, col))
}

export const isEqualTemplate = (a: GuideTemplate, b: GuideTemplate) =>
  a.count === b.count && a.col === b.col && a.row === b.row
