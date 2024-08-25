import { randomInt } from "crypto";

function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[arr.length - 1];
  const leftArr: number[] = [];
  const rightArr: number[] = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      leftArr.push(arr[i]);
    } else {
      rightArr.push(arr[i]);
    }
  }

  return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
}

const testArray = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
console.log(`quickSort: ${quickSort(testArray)}`);
const largeTest = Array(100000).fill(null).map(_ => randomInt(100))
const before = performance.now()
quickSort(largeTest)
const after = performance.now()
console.log(`quickSort duration: ${(after - before) / 1000}s`)