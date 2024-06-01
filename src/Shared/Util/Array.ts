import { SortDirection } from "../Components/Grid/Models";

export const chunk = (arr: any, chunkSize: number) => {
  const results = [];
  for (var i = 0, len = arr.length; i < len; i += chunkSize)
    results.push(arr.slice(i, i + chunkSize));
  return results;
};

export const range = (start: number, end: number, step = 1) => {
  const array = [];
  if (step > 0) {
    for (let i = start; i <= end; i += step) {
      array.push(i);
    }
  } else if (step < 0) {
    for (let i = start; i >= end; i += step) {
      array.push(i);
    }
  }
  return array;
};

export const sort = <T>(
  list: T,
  sortDirection: SortDirection,
  sortBy: string,
) => {
  return (list as any).toSorted(
    sortDirection === "asc"
      ? (a: any, b: any) =>
          a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0
      : (a: any, b: any) =>
          a[sortBy] > b[sortBy] ? -1 : a[sortBy] < b[sortBy] ? 1 : 0,
  );
};
