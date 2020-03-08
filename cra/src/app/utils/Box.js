const Box = x => ({
  map: f => Box(f(x)),
  chain: f => f(x),
  ap: b2 => b2.map(x),
  fold: f => f(x),
  inspect() {
    return `Box(${x})`;
  }
});
export default Box;