import { Card, generateCard } from './card';
import Square from './square';

export default class Game {
  field: Square<Card>;

  constructor(size: number) {
    this.field = new Square(size);
  }

  init() {
    this.addCard(generateCard());
    this.addCard(generateCard());
    this.printMap();
  }

  move(direction: 'U' | 'D' | 'L' | 'R') {
    const before = this.field.clone();

    switch (direction) {
      case 'U':
        this.moveUp();
        break;
      case 'D':
        this.moveDown();
        break;
      case 'L':
        this.moveLeft();
        break;
      case 'R':
        this.moveRight();
        break;
    }

    if (!this.field.equals(before)) {
      // 이전과 상태가 달라진 경우에만 새로운 카드 추가
      this.addCard(generateCard());
    }

    this.printMap();
  }

  private moveUp() {
    this.field.getCols().forEach((col, idx) => {
      const newCol = this.alignLeft(this.mergeLeft(col));
      this.field.setCol(idx, newCol);
    });
  }

  private moveDown() {
    this.field.getCols().forEach((col, idx) => {
      const newCol = this.alignRight(this.mergeRight(col));
      this.field.setCol(idx, newCol);
    });
  }

  private moveLeft() {
    this.field.getRows().forEach((row, idx) => {
      const newRow = this.alignLeft(this.mergeLeft(row));
      this.field.setRow(idx, newRow);
    });
  }

  private moveRight() {
    this.field.getRows().forEach((row, idx) => {
      const newRow = this.alignRight(this.mergeRight(row));
      this.field.setRow(idx, newRow);
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
   * 빈 타일에 새로운 카드를 추가한다.
   */
  private addCard(card: Card) {
    const pos = this.field.getEmptyPos();
    const [row, col] = pos[getRandomInt(pos.length)];
    this.field.setItem(row, col, card);
  }

  private printMap() {
    console.log(
      this.field
        .getRows()
        .map((row) => row.map((item) => item?.num ?? 0))
        .join('\n')
    );
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
