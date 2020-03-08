class HeapSort {
  constructor(list) {
    this._list = new List([...list]);
    this.action = [];
  }

  sort(value) {
    this.value = value;
    this.length = this._list.list.length;
    this.heapSize = this.length;
    this.buildMaxHeap();
    for (let i = this.length - 1; i >= 1; i--) {
      this.heapExtractMax();
    }

    return this.action;
  }
  buildMaxHeap() {
    for (let i = parseInt(this.length / 2, 10) - 1; i >= 0; i--)
      this.maxHeapify(i);
  }

  maxHeapify(i) {
    let l = 2 * i + 1;
    let r = 2 * i + 2;
    let largest = i;

    if (
      l < this.heapSize &&
      this.value(this._list.at(l)) > this.value(this._list.at(largest))
    ) {
      largest = l;
    }
    if (
      r < this.heapSize &&
      this.value(this._list.at(r)) > this.value(this._list.at(largest))
    ) {
      largest = r;
    }
    if (largest !== i) {
      this.action.push({
        type: "LIST_SWAP",
        payload: { pos: [i, largest] }
      });
      this._list.swap(i, largest);
      this.maxHeapify(largest);
    }
  }

  heapExtractMax() {
    if (this.heapSize < 1) throw new TypeError("Heap empty");
    let max = this._list.at(0);
    this.action.push({
      type: "LIST_SWAP",
      payload: { pos: [0, this.heapSize - 1] }
    });
    this._list.swap(0, this.heapSize - 1);
    this.heapSize--;
    this.maxHeapify(0);
    return max;
  }
}
