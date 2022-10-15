function merge(A: number[], B: number[]) {
  let i = 0;
  let j = 0;

  const C: number[] = [];
  for (let k = 0; k < A.length + B.length; k++) {
    if (A[i] < B[j] || j === B.length) {
      C.push(A[i]);
      i++;
    } else {
      C.push(B[j]);
      j++;
    }
  }
  return C;
}

function sort(C: number[]): number[] {
  if (!C || C.length === 1 || C.length === 0) return C;
  const midIndex = Math.floor(C.length / 2);
  const A = C.slice(0, midIndex);
  const B = C.slice(midIndex);
  const sortedA = sort(A);
  const sortedB = sort(B);
  return merge(sortedA, sortedB);
}

console.log(sort([1, 10, 5, 9, 15, 10, 45, 99, -2, 2, 3]));
