import { Right, Left } from './Either.js'

const curry = fn => {
  const len = fn.length
  return function $curry(...args) {
    return args.length < len
      ? curry(fn.bind(null, ...args))
      : fn.call(null, ...args)
  }
}

const compose = (...fns) => (...args) =>
  fns.reduceRight((acc, next) => [next.call(null, ...acc)], args)[0]

const log = x => console.log(x && x.inspect ? x.inspect() : x)
const liftA2 = curry((fn, a1, a2) => a1.map(fn).ap(a2))
const liftA3 = curry((fn, a1, a2, a3) =>
  a1
    .map(fn)
    .ap(a2)
    .ap(a3)
)

const toUpper = str => str.toUpperCase()
const replace = curry((match, withStr, str) => str.replace(match, withStr))
const map = curry((f, a) => a.map(f))
const safeType = curry((tp, data) =>
  typeof data === tp ? Right(data) : Left(data)
)

const trace = x => {
  console.log(x)
  return x
}
const join = curry((st, ar) => ar.join(st))
const getCharCode = x => x.charCodeAt(0)
const fromCharCode = x => String.fromCharCode(x)
const split = curry((sp, str) => str.split(sp))
const prop = curry((prop, obj) => obj[prop])
const toInt = x => parseInt(x, 10)
const mod = curry((m, val) => {
  while (val < 0) {
    val += m
  }
  return val % m
})

const throttle = (callback, sec = 0) => {
  let currentTime = 0
  return (...args) => {
    const presentTime = Date.now()
    if (presentTime - currentTime >= sec) {
      callback(...args)
      currentTime = presentTime
    }
  }
}

const generateSortList = (x, n) => {
  switch (n) {
    case 1:
      return new Array(x)
        .fill(1)
        .map((_, i) => ({ height: (i + 1) * 10, y: x * 10 - (i + 1) * 10 }))
    case 2:
      return new Array(x).fill(1).map((_, i) => {
        const k = x - i - 1
        return { height: (k + 1) * 10, y: x * 10 - (k + 1) * 10 }
      })
    case 3:
      let arr = new Array(x).fill(1).map((_, i) => i + 1)
      return new Array(x).fill(1).map((_, i) => {
        let item = Math.floor(Math.random() * arr.length)
        const [height] = arr.splice(item, 1)
        return { height: height * 10, y: x * 10 - height * 10 }
      })
    default:
      return []
  }
}

export {
  curry,
  mod,
  compose,
  log,
  liftA2,
  toUpper,
  liftA3,
  replace,
  map,
  safeType,
  join,
  getCharCode,
  toInt,
  split,
  fromCharCode,
  trace,
  prop,
  throttle,
  generateSortList,
}
