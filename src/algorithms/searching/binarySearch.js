export const binarySearch = async (array, setArray, target, speedRef, playTone) => {
  const arr = [...array];
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    arr[mid].color = 'orange';
    setArray([...arr]);
    playTone(arr[mid].value);
    await new Promise((res) => setTimeout(res, speedRef.current));

    if (arr[mid].value === target) {
      arr[mid].color = 'green';
      setArray([...arr]);
      return;
    }

    arr[mid].color = 'red';

    if (arr[mid].value < target) left = mid + 1;
    else right = mid - 1;

    setArray([...arr]);
  }
};
