class MergeSort {
  constructor(list) {
    this._list = new List([...list]);
  }
  sort(value) {
    let length = this._list.list.length;
    this.value = value;
    this.action = [];
    this.mergeSort(0, length - 1);
    return this.action;
  }
  mergeSort(p, r) {
    if (p < r) {
      let q = parseInt((p + r) / 2, 10);
      this.mergeSort(p, q);
      this.mergeSort(q + 1, r);
      this.merge(p, q, r);
    }
  }
  merge(p, q, r) {
    let n1 = q - p + 1;
    let n2 = r - q;
    let L = [];
    let R = [];
    for (let i = 0; i < n1; i++) {
      L[i] = {
        item: this._list.at(p + i),
        val: this.value(this._list.at(p + i))
      };
    }
    for (let j = 0; j < n2; j++) {
      R[j] = {
        item: this._list.at(q + j + 1),
        val: this.value(this._list.at(q + j + 1))
      };
    }
    L[n1] = { val: Infinity };
    R[n2] = { val: Infinity };
    let i = 0;
    let j = 0;
    for (let k = p; k <= r; k++) {
      if (L[i].val <= R[j].val) {
        this.action.push({
          type: "LIST_STORE",
          payload: { i: k, val: L[i].item, boundary: [p, r], pivot: k }
        });
        this._list.storeAt(k, L[i].item);
        i++;
      } else {
        this.action.push({
          type: "LIST_STORE",
          payload: { i: k, val: R[j].item, boundary: [p, r], pivot: k }
        });
        this._list.storeAt(k, R[j].item);
        j++;
      }
    }
  }
}
