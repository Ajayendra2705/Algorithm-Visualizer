export const linearSearch = async (array, setArray, target, speedRef, playTone) => {
  const arr = [...array];

  for (let i = 0; i < arr.length; i++) {
    arr[i].color = 'orange';
    setArray([...arr]);
    playTone(arr[i].value);
    await new Promise((res) => setTimeout(res, speedRef.current));

    if (arr[i].value === target) {
      arr[i].color = 'green';
      setArray([...arr]);
      return;
    }

    arr[i].color = 'red';
    setArray([...arr]);
  }
};
