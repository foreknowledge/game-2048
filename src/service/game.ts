import { Card, generateCard, generateTwoCards } from './card';

export default class Game {
  size: number;
  field: (Card | null)[][];

  constructor(size: number) {
    this.size = size;
    this.field = Array.from(Array(size), () => Array(size).fill(null));
  }

  init() {
    const [first, second] = generateTwoCards(this.size);
    this.addCard(first);
    this.addCard(second);
    this.printMap();
  }

  move(direction: 'U' | 'D' | 'L' | 'R') {
    this.mergeAndMoveCards(direction);
    this.addCardAtEmptyPos();
    this.printMap();
  }

  mergeAndMoveCards(direction: 'U' | 'D' | 'L' | 'R') {
    const N = this.size;
    switch (direction) {
      case 'U':
        for (let j = 0; j < N; j++) {
          for (let i = 0; i < N - 1; i++) {
            const target = this.field[i][j];
            if (target === null) continue;

            for (let t = i + 1; t < N; t++) {
              const source = this.field[t][j];
              if (source === null) continue;

              if (target.num === source.num) {
                target.num *= 2;
                this.removeCard(source);
              }
              break;
            }
          }

          const colCards = [...Array(N).keys()]
            .map((i) => this.field[i][j])
            .filter((card) => card !== null);

          for (let i = 0; i < N; i++) {
            const card = colCards[i];
            if (card) {
              this.field[i][j] = card;
              card.row = i;
            } else {
              this.field[i][j] = null;
            }
          }
        }
        break;
      case 'D':
        for (let j = 0; j < N; j++) {
          for (let i = N - 1; i >= 1; i--) {
            const target = this.field[i][j];
            if (target === null) continue;

            for (let t = i - 1; t >= 0; t--) {
              const source = this.field[t][j];
              if (source === null) continue;

              if (target.num === source.num) {
                target.num *= 2;
                this.removeCard(source);
              }
              break;
            }
          }

          const colCards = [...Array(N).keys()]
            .reverse()
            .map((i) => this.field[i][j])
            .filter((card) => card !== null);

          for (let i = N - 1; i >= 0; i--) {
            const card = colCards[N - (i + 1)];
            if (card) {
              this.field[i][j] = card;
              card.row = i;
            } else {
              this.field[i][j] = null;
            }
          }
        }
        break;
      case 'L':
        for (let i = 0; i < N; i++) {
          for (let j = 0; j < N - 1; j++) {
            const target = this.field[i][j];
            if (target === null) continue;

            for (let t = j + 1; t < N; t++) {
              const source = this.field[i][t];
              if (source === null) continue;

              if (target.num === source.num) {
                target.num *= 2;
                this.removeCard(source);
              }
              break;
            }
          }

          const colCards = [...Array(N).keys()]
            .map((j) => this.field[i][j])
            .filter((card) => card !== null);

          for (let j = 0; j < N; j++) {
            const card = colCards[j];
            if (card) {
              this.field[i][j] = card;
              card.col = j;
            } else {
              this.field[i][j] = null;
            }
          }
        }
        break;
      case 'R':
        for (let i = 0; i < N; i++) {
          for (let j = N - 1; j >= 1; j--) {
            const target = this.field[i][j];
            if (target === null) continue;

            for (let t = j - 1; t >= 0; t--) {
              const source = this.field[i][t];
              if (source === null) continue;

              if (target.num === source.num) {
                target.num *= 2;
                this.removeCard(source);
              }
              break;
            }
          }

          const colCards = [...Array(N).keys()]
            .reverse()
            .map((j) => this.field[i][j])
            .filter((card) => card !== null);

          for (let j = N - 1; j >= 0; j--) {
            const card = colCards[N - (j + 1)];
            if (card) {
              this.field[i][j] = card;
              card.col = j;
            } else {
              this.field[i][j] = null;
            }
          }
        }
        break;
    }
  }

  addCardAtEmptyPos() {
    const allEmptyPos: [number, number][] = [];
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.field[i][j] === null) {
          allEmptyPos.push([i, j]);
        }
      }
    }

    const random = getRandomInt(allEmptyPos.length);
    const [row, col] = allEmptyPos[random];
    this.addCard(generateCard(row, col));
  }

  addCard(card: Card) {
    this.field[card.row][card.col] = card;
  }

  removeCard(card: Card) {
    this.field[card.row][card.col] = null;
  }

  printMap() {
    console.log(
      this.field.map((row) => row.map((col) => col?.num ?? 0)).join('\n')
    );
  }
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}
