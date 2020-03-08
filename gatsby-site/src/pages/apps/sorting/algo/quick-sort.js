class QuickSort {
  constructor(list) {
    this._list = new List([...list]);
  }

  sort(compare) {
    let length = this._list.list.length;
    this.compare = compare;
    this.action = [];

    this.quickSort(0, length - 1);
    return this.action;
  }

  quickSort(p, r) {
    if (p < r) {
      let q = this.partition(p, r);
      this.quickSort(p, q - 1);
      this.quickSort(q + 1, r);
    }
  }

  partition(p, r) {
    let x = this._list.at(r);
    let i = p - 1;
    for (let j = p; j < r; j++) {
      if (this.compare(x, this._list.at(j))) {
        i++;

        this._list.swap(i, j);
        this.action.push({
          type: "LIST_SWAP",
          payload: {
            pos: [i, j],
            boundary: [p, r],
            pivot: i
          }
        });
      }
    }
    i++;
    this.action.push({
      type: "LIST_SWAP",
      payload: {
        pos: [i, r],
        boundary: [p, r],
        pivot: i
      }
    });
    this._list.swap(i, r);

    return i;
  }
}
