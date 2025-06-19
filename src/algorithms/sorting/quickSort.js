export const quickSort = async (array, setArray, speedRef, playTone) => {
  const arr = [...array];

  async function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      arr[j].color = 'red';
      playTone(arr[j].value);
      await new Promise((res) => setTimeout(res, speedRef.current));
      if (arr[j].value < pivot.value) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      arr[j].color = 'steelblue';
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    return i + 1;
  }

  async function quickSortHelper(arr, low, high) {
    if (low < high) {
      let pi = await partition(arr, low, high);
      await quickSortHelper(arr, low, pi - 1);
      await quickSortHelper(arr, pi + 1, high);
    }
  }

  await quickSortHelper(arr, 0, arr.length - 1);
  setArray([...arr]);
};
