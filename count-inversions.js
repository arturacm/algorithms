function countAndMerge(A, B) {
  if (!B) return { inversions: 0, numbers: A };
  if (!A) return { inversions: 0, numbers: B };
  let i = 0;
  let j = 0;

  const C = [];
  let inversions = 0;
  for (let k = 0; k < A.length + B.length; k++) {
    if (A[i] < B[j] || j === B.length) {
      C.push(A[i]);
      i++;
    } else {
      if (i < A.length) {
        inversions += A.length - i;
      }
      C.push(B[j]);
      j++;
    }
  }
  return { inversions, numbers: C };
}

function countAndSort(C) {
  if (!C || C.length === 1 || C.length === 0)
    return { inversions: 0, numbers: C };
  const midIndex = Math.floor(C.length / 2);
  const A = C.slice(0, midIndex);
  const B = C.slice(midIndex);
  const { inversions: inversionsA, numbers: sortedA } = countAndSort(A);
  const { inversions: inversionsB, numbers: sortedB } = countAndSort(B);
  const { numbers, inversions } = countAndMerge(sortedA, sortedB);
  return {
    numbers,
    inversions: inversions + inversionsA + inversionsB,
  };
}

console.log(countAndSort([1, 3, 5, 2, 4, 6]));
