export const getRangeYear = (start: number, end: number): number[] => new Array(start - end).fill(null).map((val, i) => start - i);