import { Card, generateCard } from './card';
import Square from './square';

export default class Field {
  size: number;
  square: Square<Card>;

  constructor(size: number) {
    this.size = size;
    this.square = new Square(size);
  }

  init() {
    this.addNewCard();
    this.addNewCard();
    this.printMap();
  }

  moveUp() {
    this.square.getCols().forEach((col, idx) => {
      const newCol = this.alignLeft(this.mergeLeft(col));
      this.square.setCol(idx, newCol);
    });
  }

  moveDown() {
    this.square.getCols().forEach((col, idx) => {
      const newCol = this.alignRight(this.mergeRight(col));
      this.square.setCol(idx, newCol);
    });
  }

  moveLeft() {
    this.square.getRows().forEach((row, idx) => {
      const newRow = this.alignLeft(this.mergeLeft(row));
      this.square.setRow(idx, newRow);
    });
  }

  moveRight() {
    this.square.getRows().forEach((row, idx) => {
      const newRow = this.alignRight(this.mergeRight(row));
      this.square.setRow(idx, newRow);
    });
  }

  private mergeLeft(cards: (Card | null)[]): (Card | null)[] {
    const mergedCards = [...cards];
    const N = cards.length;

    for (let i = 0; i < N - 1; i++) {
      const card = mergedCards[i];
      if (card === null) continue;
      for (let t = i + 1; t < N; t++) {
        const other = mergedCards[t];
        if (other === null) continue;

        if (card.num === other.num) {
          mergedCards[i] = { num: card.num * 2 };
          mergedCards[t] = null;
        }
        break;
      }
    }

    return mergedCards;
  }

  private mergeRight(cards: (Card | null)[]): (Card | null)[] {
    return this.mergeLeft(cards.reverse()).reverse();
  }

  private alignLeft(cards: (Card | null)[]): (Card | null)[] {
    const N = cards.length;
    const nonNullCards = cards.filter((card) => card !== null);

    return padRight(nonNullCards, N - nonNullCards.length);
  }

  private alignRight(cards: (Card | null)[]): (Card | null)[] {
    return this.alignLeft(cards.reverse()).reverse();
  }

  /**
   * 빈공간에 새로운 카드를 추가한다.
   */
  addNewCard() {
    const pos = this.square.getEmptyPos();
    const [row, col] = pos[getRandomInt(pos.length)];
    this.square.setItem(row, col, generateCard());
  }

  printMap() {
    console.log(
      this.square
        .getRows()
        .map((row) => row.map((item) => item?.num ?? 0))
        .join('\n')
    );
  }

  clone(): Field {
    const field = new Field(this.size);
    field.square = this.square.clone();
    return field;
  }

  equals(other: Field): boolean {
    return this.square.equals(other.square);
  }
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

/**
 * 넘어온 items에 오른쪽에 count 갯수만큼 null을 채운다.
 */
function padRight(
  items: readonly (Card | null)[],
  count: number
): (Card | null)[] {
  return [...items, ...Array(count).fill(null)];
}
