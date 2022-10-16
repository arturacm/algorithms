function multiply(x: string, y: string): string {
  if (parseInt(x) < 10 && parseInt(y) < 10) {
    return String(parseInt(x) * parseInt(y));
  }

  let xString = x.length % 2 ? `0${x}` : x;
  let yString = y.length % 2 ? `0${y}` : y;

  while (xString.length !== yString.length) {
    if (xString.length > yString.length) {
      yString = `0${yString}`;
    } else {
      xString = `0${xString}`;
    }
  }

  const n = xString.length;

  const a = xString.slice(0, n / 2);
  const b = xString.slice(n / 2, xString.length);

  const c = yString.slice(0, n / 2);
  const d = yString.slice(n / 2, yString.length);
  const ac = multiply(a, c);
  const bd = multiply(b, d);
  const pq = multiply(sumTwoStrings(a, b), sumTwoStrings(c, d));
  const abcd = subtractTwoStrings(pq, sumTwoStrings(bd, ac));
  return sumTwoStrings(
    sumTwoStrings(multiplyPowerOf10(ac, n), multiplyPowerOf10(abcd, n / 2)),
    bd
  );
}

function multiplyPowerOf10(base: string, n: number): string {
  let result = `${base}`;
  for (let i = 0; i < n; i++) {
    result += "0";
  }
  return result;
}

// Testing result:
console.log(
  multiply(
    `123123123124415123125123125354626234232342423412`,
    `234345234652462455345326324532242362454234235232`
  )
);

function sumTwoStrings(x: string, y: string): string {
  let xString = x.toString();
  let yString = y.toString();

  while (xString.length !== yString.length) {
    if (xString.length > yString.length) {
      yString = `0${yString}`;
    } else {
      xString = `0${xString}`;
    }
  }

  let result = "";
  let partial: number;
  let acc = 0;
  for (let i = xString.length - 1; i >= 0; i--) {
    partial = parseInt(xString[i]) + parseInt(yString[i]);

    if (partial + acc >= 10) {
      result = `${partial - 10 + acc}${result}`;
      acc = 1;
    } else {
      result = `${partial + acc}${result}`;
      acc = 0;
    }
  }
  return acc ? `1${result}` : result;
}

function subtractTwoStrings(x: string, y: string): string {
  while (x.length !== y.length) {
    if (x.length > y.length) {
      y = `0${y}`;
    } else {
      x = `0${x}`;
    }
  }

  let result = "";
  let partial: number;
  let acc = 0;
  for (let i = x.length - 1; i >= 0; i--) {
    partial = parseInt(x[i]) - parseInt(y[i]);

    if (partial - acc < 0) {
      result = `${partial + 10 - acc}${result}`;
      acc = 1;
    } else {
      result = `${partial - acc}${result}`;
      acc = 0;
    }
  }
  return result;
}
