export const Right = x => ({
  map: f => Right(f(x)),
  fold: (_, g) => g(x),
  chain: f => f(x),
  ap: b2 => b2.map(x),
  inspect: () => `Right(${x})`,
  of: x => Right(x)
});

export const Left = x => ({
  map: _ => Left(x),
  fold: (f, _) => f(x),
  chain: _ => Left(x),
  ap: _ => Left(x),
  inspect: () => `Left(${x})`
});

export const tryCatch = (fn, ...args) => {
  try {
    return Right(fn(...args));
  } catch (e) {
    return Left(e);
  }
};

export const fromNullable = x => (x == null ? Left() : Right(x));
