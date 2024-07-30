export default function mergeSort(arr) {
  let leftArr = [];
  let rightArr = [];

  function sort(arr) {
    if (arr.length <= 1) return [arr];

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    const leftSteps = sort(left);
    const rightSteps = sort(right);

    leftArr.push([...left]);
    rightArr.push([...right]);

    const merged = merge(
      leftSteps[leftSteps.length - 1],
      rightSteps[rightSteps.length - 1]
    );
    return [...leftSteps, ...rightSteps, merged];
  }

  const steps = sort(arr);
  return { steps, leftArr, rightArr };
}

function merge(left, right) {
  let resultArray = [],
    leftIndex = 0,
    rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      resultArray.push(left[leftIndex]);
      leftIndex++;
    } else {
      resultArray.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return resultArray
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}
