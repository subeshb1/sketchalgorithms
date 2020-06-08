import { compose } from "./utils.js";
export default class Task {
  constructor(fork) {
    this.fork = fork;
  }

  inspect() {
    return "Task(?)";
  }

  static rejected(x) {
    return new Task((reject, _) => reject(x));
  }

  // ----- Pointed (Task a)
  static of(x) {
    return new Task((_, resolve) => resolve(x));
  }

  // ----- Functor (Task a)
  map(fn) {
    return new Task((reject, resolve) =>
      this.fork(
        reject,
        compose(
          resolve,
          fn
        )
      )
    );
  }

  // ----- Applicative (Task a)
  ap(f) {
    return this.chain(fn => f.map(fn));
  }

  // ----- Monad (Task a)
  chain(fn) {
    return new Task((reject, resolve) =>
      this.fork(reject, x => fn(x).fork(reject, resolve))
    );
  }

  join() {
    return this.chain(x => x);
  }
}
