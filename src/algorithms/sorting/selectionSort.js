export const selectionSort = async (array, setArray, speedRef, playTone) => {
  const arr = [...array];

  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    arr[minIdx].color = 'orange';

    for (let j = i + 1; j < arr.length; j++) {
      arr[j].color = 'red';
      setArray([...arr]);
      playTone(arr[j].value);
      await new Promise((res) => setTimeout(res, speedRef.current));
      if (arr[j].value < arr[minIdx].value) {
        arr[minIdx].color = 'steelblue';
        minIdx = j;
        arr[minIdx].color = 'orange';
      } else {
        arr[j].color = 'steelblue';
      }
    }

    if (i !== minIdx) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }

    arr[i].color = 'green';
  }

  setArray([...arr]);
};
