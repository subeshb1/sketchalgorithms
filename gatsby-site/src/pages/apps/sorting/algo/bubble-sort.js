import List from './list'
export default class BubbleSort {
  constructor(list) {
    this._list = new List([...list]);
  }
  sort(compare) {
    let length = this._list.list.length;
    let action = [];
    for (let i = length - 1; i > 0; i--) {
      for (let j = 0; j < i; j++) {
        if (compare(this._list.at(j), this._list.at(j + 1))) {
          this._list.swap(j, j + 1);
          action.push({
            type: "LIST_SWAP",
            payload: {
              pos: [j, j + 1],
            }
          });
        }
      }
    }
    return action;
  }
}
