//eslint-disable-next-line
export default () => {
  function _toConsumableArray(a) {
    if (Array.isArray(a)) {
      for (var r = 0, o = Array(a.length); r < a.length; r++) o[r] = a[r]
      return o
    }
    return Array.from(a)
  }
  self.onmessage = function(a) {
    for (
      var r = function(a, r, o, t, e) {
          return [a < o ? a : e ? o - 1 : 0, r < t ? r : e ? t - 1 : 0]
        },
        o = [],
        t = a.data[0],
        e = a.data[1],
        s = r.apply(void 0, _toConsumableArray(a.data[2]).concat([t, e])),
        n = r.apply(void 0, _toConsumableArray(a.data[3]).concat([t, e, 1])),
        d = a.data[4],
        l = 0;
      l < t;
      l++
    )
      for (var c, i = 0; i < e; i++)
        (c = void 0),
          l === s[0] && i === s[1]
            ? (c = 'start')
            : l === n[0] && i === n[1] && (c = 'end'),
          o.push({
            x: 10 * i,
            y: 10 * l,
            className: c,
            color: 'UNVISITED',
            pos: { i: l, j: i },
            predecessor: void 0,
            d: 1 / 0,
          })
    self.postMessage({ graph: o, row: t, col: e, displayText: d })
  }
}
