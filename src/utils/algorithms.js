// src/utils/algorithms.js

export const COLOR_MAP = {
  default: '#d3d3d3',      // light gray
  comparing: '#ff9933',    // orange
  swapping: '#ff4d4d',     // red
  sorted: '#66cc66',       // green
  active: '#3399ff'        // blue
};

export function* bubbleSortSteps(array) {
  let arr = array.slice();
  let n = arr.length;
  let colorKey = Array(n).fill("default");
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      colorKey = Array(n).fill("default");
      colorKey[j] = colorKey[j + 1] = "comparing";
      comparisons++;
      yield { arr: arr.slice(), colorKey: colorKey.slice(), comparisons, swaps };

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swaps++;
        colorKey[j] = colorKey[j + 1] = "swapping";
        yield { arr: arr.slice(), colorKey: colorKey.slice(), comparisons, swaps };
      }
    }
    colorKey = Array(n).fill("default");
    for (let k = n - i - 1; k < n; k++) colorKey[k] = "sorted";
    yield { arr: arr.slice(), colorKey: colorKey.slice(), comparisons, swaps };
  }
  colorKey = Array(n).fill("sorted");
  yield { arr: arr.slice(), colorKey: colorKey.slice(), comparisons, swaps };
}

export function* selectionSortSteps(array) {
  let arr = array.slice();
  let n = arr.length;
  let colorKey = Array(n).fill("default");
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      colorKey = Array(n).fill("default");
      colorKey[minIdx] = "active";
      colorKey[j] = "comparing";
      comparisons++;
      yield { arr: arr.slice(), colorKey: colorKey.slice(), comparisons, swaps };

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        colorKey[minIdx] = "active";
        yield { arr: arr.slice(), colorKey: colorKey.slice(), comparisons, swaps };
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      swaps++;
      colorKey[i] = colorKey[minIdx] = "swapping";
      yield { arr: arr.slice(), colorKey: colorKey.slice(), comparisons, swaps };
    }
    for (let k = 0; k <= i; k++) colorKey[k] = "sorted";
    yield { arr: arr.slice(), colorKey: colorKey.slice(), comparisons, swaps };
  }
  colorKey = Array(n).fill("sorted");
  yield { arr: arr.slice(), colorKey: colorKey.slice(), comparisons, swaps };
}

export function* insertionSortSteps(array) {
  let arr = array.slice();
  let n = arr.length;
  let colorKey = Array(n).fill("default");
  let comparisons = 0;
  let swaps = 0;

  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      comparisons++;
      arr[j + 1] = arr[j];
      colorKey = Array(n).fill("default");
      colorKey[j] = colorKey[j + 1] = "swapping";
      swaps++;
      yield { arr: arr.slice(), colorKey: colorKey.slice(), comparisons, swaps };
      j--;
    }
    arr[j + 1] = key;
    colorKey = Array(n).fill("default");
    colorKey[j + 1] = "active";
    yield { arr: arr.slice(), colorKey: colorKey.slice(), comparisons, swaps };
  }
  colorKey = Array(n).fill("sorted");
  yield { arr: arr.slice(), colorKey: colorKey.slice(), comparisons, swaps };
}

export function* mergeSortSteps(array) {
  let arr = array.slice();
  let n = arr.length;
  let colorKey = Array(n).fill("default");
  let comparisons = 0;
  let swaps = 0;

  function* mergeSortRecursive(start, end) {
    if (end - start <= 1) return;
    const mid = Math.floor((start + end) / 2);
    yield* mergeSortRecursive(start, mid);
    yield* mergeSortRecursive(mid, end);
    
    let temp = [], i = start, j = mid;
    while (i < mid && j < end) {
      comparisons++;
      colorKey = Array(n).fill("default");
      colorKey[i] = colorKey[j] = "comparing";
      yield { arr: arr.slice(), colorKey: colorKey.slice(), comparisons, swaps };
      if (arr[i] < arr[j]) temp.push(arr[i++]);
      else temp.push(arr[j++]);
    }
    while (i < mid) temp.push(arr[i++]);
    while (j < end) temp.push(arr[j++]);
    for (let k = 0; k < temp.length; k++) {
      arr[start + k] = temp[k];
      swaps++;
      colorKey[start + k] = "swapping";
      yield { arr: arr.slice(), colorKey: colorKey.slice(), comparisons, swaps };
    }
  }
  yield* mergeSortRecursive(0, n);
  colorKey = Array(n).fill("sorted");
  yield { arr: arr.slice(), colorKey: colorKey.slice(), comparisons, swaps };
}

export function* quickSortSteps(array) {
  let arr = array.slice();
  let n = arr.length;
  let colorKey = Array(n).fill("default");
  let comparisons = 0;
  let swaps = 0;

  function* quickSortRecursive(start, end) {
    if (start >= end) return;
    let pivot = arr[end];
    let i = start;
    for (let j = start; j < end; j++) {
      comparisons++;
      colorKey = Array(n).fill("default");
      colorKey[j] = "comparing";
      colorKey[end] = "active";
      yield { arr: arr.slice(), colorKey: colorKey.slice(), comparisons, swaps };
      if (arr[j] < pivot) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        swaps++;
        colorKey[i] = colorKey[j] = "swapping";
        yield { arr: arr.slice(), colorKey: colorKey.slice(), comparisons, swaps };
        i++;
      }
    }
    [arr[i], arr[end]] = [arr[end], arr[i]];
    swaps++;
    colorKey[i] = colorKey[end] = "swapping";
    yield { arr: arr.slice(), colorKey: colorKey.slice(), comparisons, swaps };
    yield* quickSortRecursive(start, i - 1);
    yield* quickSortRecursive(i + 1, end);
  }

  yield* quickSortRecursive(0, n - 1);
  colorKey = Array(n).fill("sorted");
  yield { arr: arr.slice(), colorKey: colorKey.slice(), comparisons, swaps };
}