export const insertionSort = async (array, setArray, speedRef, playTone) => {
  const arr = [...array];

  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    arr[i].color = 'orange';

    while (j >= 0 && arr[j].value > key.value) {
      arr[j + 1] = arr[j];
      arr[j].color = 'red';
      setArray([...arr]);
      playTone(arr[j].value);
      await new Promise((res) => setTimeout(res, speedRef.current));
      arr[j].color = 'steelblue';
      j--;
    }

    arr[j + 1] = key;
    arr[i].color = 'steelblue';
  }

  setArray([...arr]);
};
