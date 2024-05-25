export const chunk = (arr: any, chunkSize: number) => {
  const results = [];
  for (var i = 0, len = arr.length; i < len; i += chunkSize)
    results.push(arr.slice(i, i + chunkSize));
  return results;
};
