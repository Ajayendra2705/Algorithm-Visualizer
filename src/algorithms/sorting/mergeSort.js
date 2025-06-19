export const mergeSort = async (array, setArray, speedRef, playTone) => {
  const arr = [...array];

  async function merge(arr, l, m, r) {
    let n1 = m - l + 1;
    let n2 = r - m;

    let L = arr.slice(l, m + 1);
    let R = arr.slice(m + 1, r + 1);

    let i = 0, j = 0, k = l;

    while (i < n1 && j < n2) {
      playTone(L[i].value);
      await new Promise((res) => setTimeout(res, speedRef.current));
      if (L[i].value <= R[j].value) {
        arr[k++] = { ...L[i++], color: 'lightgreen' };
      } else {
        arr[k++] = { ...R[j++], color: 'lightgreen' };
      }
      setArray([...arr]);
    }

    while (i < n1) arr[k++] = { ...L[i++], color: 'lightgreen' };
    while (j < n2) arr[k++] = { ...R[j++], color: 'lightgreen' };

    setArray([...arr]);
  }

  async function mergeSortHelper(arr, l, r) {
    if (l < r) {
      let m = Math.floor((l + r) / 2);
      await mergeSortHelper(arr, l, m);
      await mergeSortHelper(arr, m + 1, r);
      await merge(arr, l, m, r);
    }
  }

  await mergeSortHelper(arr, 0, arr.length - 1);
  setArray([...arr]);
};
