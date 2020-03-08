export const Right = x => ({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  toString: () => `Right(${x})`
});
// Does not perform any action
export const Left = x => ({
  chain: f => Left(x),
  map: f => Left(x),
  fold: (f, g) => f(x),
  toString: () => `Right(${x})`
});

export const head = ([x]) => x;
export const fromNullable = x => (x != null ? Right(x) : Left(x));

export const tryCatch = f => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};

export const LazyBox = g => ({
  fold: f => f(g()),
  map: f => LazyBox(() => f(g()))
});

export const min = arr => arr.reduce((acc, e) => (e < acc ? e : acc), Infinity);
export const max = arr =>
  arr.reduce((acc, e) => (e > acc ? e : acc), -Infinity);

//Curry
export const curry = fn => {
  const resLength = fn.length;
  return function $curry(...args) {
    return args.length < resLength
      ? $curry.bind(null, ...args)
      : fn.call(null, ...args);
  };
};
export const join = curry((delim, arr) => arr.join(delim));
export const split = curry((delim, str) => str.split(delim));
export const trace = curry((tag, x) => {
  console.log(tag, x);
  return x;
});
export const replace = curry((what, repStr, str) => str.replace(what, repStr));
export const match = curry((what, str) => str.match(what));
export const filter = curry((f, arr) => arr.filter(f));
export const map = curry((f, arr) => arr.map(f));
export const reduce = curry((f, start, arr) => arr.reduce(f, start));

export const throttle = (callback, sec = 0) => {
  let currentTime = 0;
  return () => {
    const presentTime = Date.now();
    if (presentTime - currentTime >= sec) {
      callback();
      currentTime = presentTime;
    }
  };
};

export const compose = (...fns) => (...args) =>
  fns.reduceRight((acc, next) => [next.call(null, ...acc)], args)[0];

export const minOf = curry((a, b) => Math.min(a, b));
export const maxOf = curry((a, b) => Math.max(a, b));
export const toInt = x => parseInt(x, 10);

export * from "./react-utils";
