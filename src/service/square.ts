export default class Square<T> {
  size: number;
  data: (T | null)[][];

  constructor(size: number) {
    this.size = size;
    this.data = Array.from(Array(size), () => Array(size).fill(null));
  }

  getItem(row: number, col: number): T | null {
    return this.data[row][col];
  }

  setItem(row: number, col: number, item: T | null) {
    this.data[row][col] = item;
  }

  getRow(row: number): (T | null)[] {
    return [...this.data[row]];
  }

  setRow(idx: number, row: (T | null)[]) {
    this.data[idx] = [...row];
  }

  getCol(col: number): (T | null)[] {
    return [...Array(this.size).keys()].map((i) => this.data[i][col]);
  }

  setCol(idx: number, col: (T | null)[]) {
    for (let i = 0; i < this.size; i++) {
      this.data[i][idx] = col[i];
    }
  }

  getRows(): (T | null)[][] {
    return [...Array(this.size).keys()].map((i) => this.getRow(i));
  }

  getCols(): (T | null)[][] {
    return [...Array(this.size).keys()].map((i) => this.getCol(i));
  }

  getEmptyPos(): [number, number][] {
    const allEmptyPos: [number, number][] = [];
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.getItem(i, j) === null) {
          allEmptyPos.push([i, j]);
        }
      }
    }
    return allEmptyPos;
  }
}
