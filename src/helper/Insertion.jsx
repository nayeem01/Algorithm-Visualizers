export default function Insertion(arr) {
  const steps = [];
  for (let i = 0; i < arr.length; i++) {
    const currentVal = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > currentVal) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = currentVal;
    steps.push([...arr]);
  }
  return steps;
}
