import Pos from './pos';

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

  getEmptyPos(): Pos[] {
    const allEmptyPos: Pos[] = [];
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.getItem(i, j) === null) {
          allEmptyPos.push({ row: i, col: j });
        }
      }
    }
    return allEmptyPos;
  }

  getPos(item: T): Pos | undefined {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.getItem(i, j) === item) {
          return { row: i, col: j };
        }
      }
    }
  }

  clone(): Square<T> {
    const data: (T | null)[][] = [];
    this.getRows().forEach((items) => {
      data.push([...items]);
    });

    const square = new Square<T>(this.size);
    square.data = data;

    return square;
  }

  equals(other: Square<T>): boolean {
    const flatten = [...this.data.flat()];
    return other.data.flat().every((item, idx) => flatten[idx] === item);
  }
}
