function merge(A, B) {
  if (!B) return A;
  if (!A) return B;
  let i = 0;
  let j = 0;

  const C = [];
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

function sort(C) {
  if (!C || C.length === 1 || C.length === 0) return C;
  const k = (C.length + (C.length % 2)) / 2;
  const A = C.splice(0, k);
  const sortedA = sort(A);
  const sortedB = sort(C);
  return merge(sortedA, sortedB);
}

console.log(sort([1, 10, 5, 9, 15, 10, 45, 99, -2, 2, 3]));
