export const merge = (arr1, arr2, comparator) => {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    // arr1 comes before arr2
    if (comparator(arr2[j], arr1[i]) === 1) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }

  // Add any remaining elements.
  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }

  return result;
};

export const mergeSort = (arr, comparator) => {
  if (arr.length <= 1) return arr;

  let halfPoint = Math.ceil(arr.length / 2);

  let firstHalf = mergeSort(arr.splice(0, halfPoint), comparator);
  let secondHalf = mergeSort(arr.splice(-halfPoint), comparator);

  return merge(firstHalf, secondHalf, comparator);
};

export const compareBy = (columns) => {
  return (a, b) => {
    for (let i = 0; i < columns.length; i++) {
      let dir = 1;
      let column = columns[i];

      if (column.charAt(0) === "-") {
        column = column.substr(1);
        dir = -dir;
      }
      if (a[column] > b[column]) return dir;
      else if (a[column] < b[column]) return -dir;
    }
  };
};
