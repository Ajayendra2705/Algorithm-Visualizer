export const bubbleSort = async (array, setArray, speedRef, playTone) => {
  const arr = [...array];

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].color = 'red';
      arr[j + 1].color = 'red';
      setArray([...arr]);
      playTone(arr[j].value);
      await new Promise((resolve) => setTimeout(resolve, speedRef.current));

      if (arr[j].value > arr[j + 1].value) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }

      arr[j].color = 'steelblue';
      arr[j + 1].color = 'steelblue';
    }
  }

  setArray([...arr]);
};
