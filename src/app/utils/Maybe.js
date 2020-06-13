class Maybe {
  constructor(x) {
    this.x = x;
  }
  static of(x) {
    return new Maybe(x);
  }
  get isNothing() {
    return this.x == null;
  }
  map(f) {
    return this.isNothing ? this : Maybe.of(f(this.x));
  }
  inspect() {
    return `Maybe(${this.isNothing ? "Nothing" : this.x})`;
  }
  ap(f) {
    return this.isNothing ? this : f.map(this.x);
  }
  fold(f) {
    return this.isNothing ? this.x : f(this.x);
  }
  chain(f) {
    return this.map(f).fold(x => x);
  }
}

export default Maybe;
