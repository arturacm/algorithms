type Point = {
  x: number;
  y: number;
};

type XorY = keyof Point;

function distance(point1: Point, point2: Point): number {
  return Math.sqrt(
    Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
  );
}

const input: Point[] = [
  { x: 0, y: 0 },
  { x: -2, y: 0 },
  { x: 4, y: 0 },
  { x: 1, y: 1 },
  { x: 3, y: 3 },
  { x: -2, y: 2 },
  { x: 5, y: 2 },
];

console.log(closestPair(sortBy("x", input), sortBy("y", input)));

function closestPair(pointsByX: Point[], pointsByY: Point[]): number {
  if (pointsByX.length === 2) {
    return distance(pointsByX[0], pointsByX[1]);
  }
  if (pointsByX.length === 3) {
    return Math.min(
      distance(pointsByX[0], pointsByX[1]),
      distance(pointsByX[0], pointsByX[2]),
      distance(pointsByX[1], pointsByX[2])
    );
  }

  const midIndex = Math.floor(pointsByX.length / 2);

  const distFirstHalf = closestPair(pointsByX.slice(0, midIndex), pointsByY);
  const distSecondHalf = closestPair(pointsByX.slice(midIndex), pointsByY);

  const delta = Math.min(distFirstHalf, distSecondHalf);

  const strip = pointsByY.filter(({ x }) =>
    pointsByX[midIndex]
      ? x >= pointsByX[midIndex].x - delta && x <= pointsByX[midIndex].x + delta
      : false
  );

  let d = delta;
  for (let i = 0; i < strip.length; i++) {
    for (let j = 1; j <= 7; j++) {
      if (strip[i + j]) d = Math.min(d, distance(strip[i], strip[i + j]));
    }
  }
  return d;
}

function mergeBy(XorY: XorY, A: Point[], B: Point[]): Point[] {
  if (!B) return A;

  if (!A) return B;

  let i = 0;
  let j = 0;

  const C: Point[] = [];
  for (let k = 0; k < A.length + B.length; k++) {
    if ((j === B.length && i !== A.length) || A[i]?.[XorY] < B[j]?.[XorY]) {
      C.push(A[i]);
      i++;
    } else {
      C.push(B[j]);
      j++;
    }
  }

  return C;
}

function sortBy(XorY: XorY, C: Point[]): Point[] {
  if (!C || C.length === 1 || C.length === 0) {
    return C;
  }
  const midIndex = Math.floor(C.length / 2);
  const A = C.slice(0, midIndex);
  const B = C.slice(midIndex);
  const sortedA = sortBy(XorY, A);
  const sortedB = sortBy(XorY, B);
  return mergeBy(XorY, sortedA, sortedB);
}
