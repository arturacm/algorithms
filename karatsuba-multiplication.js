function multiply(x, y) {
  if (x < 10 && y < 10) {
    return x * y;
  }

  let xString = x.toString().length % 2 ? `0${x.toString()}` : x.toString();
  let yString = y.toString().length % 2 ? `0${y.toString()}` : y.toString();

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

function multiplyPowerOf10(base, n) {
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

function sumTwoStrings(x, y) {
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
  let partial;
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

function subtractTwoStrings(x, y) {
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
  let partial;
  let acc = 0;
  for (let i = xString.length - 1; i >= 0; i--) {
    partial = parseInt(xString[i]) - parseInt(yString[i]);

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
