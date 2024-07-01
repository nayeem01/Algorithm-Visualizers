export default function Bubble(arr) {
  var steps = {},
    pos = [],
    count = 2;
  var noSwaps;
  steps[1] = [...arr];
  for (var i = arr.length; i > 0; i--) {
    noSwaps = true;
    for (var j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        noSwaps = false;
        steps[count] = [...arr];
        pos[count] = j;
        count++;
      }
    }
    if (noSwaps) break;
  }
  return [steps, pos];
}
