import { Card, generateCard } from './card';
import Pos from './pos';
import Square from './square';

export interface MergeLog {
  cardIds: [number, number];
}

export default class Field {
  size: number;
  private square: Square<Card>;
  private mergeLogs: { [cid: number]: MergeLog } = {};

  constructor(size: number) {
    this.size = size;
    this.square = new Square(size);
  }

  init() {
    this.addRandomCard();
    this.addRandomCard();
    this.printMap();
  }

  /**
   * 빈 공간에 새로운 카드를 추가한다.
   */
  addRandomCard() {
    const positions = this.square.getEmptyPos();
    const pos = positions[getRandomInt(positions.length)];
    this.square.setItem(pos, generateCard());
  }

  getCard(pos: Pos): Card | null {
    return this.square.getItem(pos);
  }

  setCard(card: Card, pos: Pos) {
    this.square.setItem(pos, card);
  }

  getAllCards(): Card[] {
    return this.square
      .getRows()
      .flat()
      .filter((item): item is Card => item !== null);
  }

  getCardPos(cardId: number): Pos | undefined {
    const card = this.getAllCards().find((card) => card.id === cardId);
    return card && this.square.getPos(card);
  }

  clearMergeLogs() {
    this.mergeLogs = {};
  }

  getMergeLog(cardId: number): MergeLog {
    return this.mergeLogs[cardId];
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
          const newCard = generateCard(card.num * 2);
          mergedCards[i] = newCard;
          mergedCards[t] = null;
          this.mergeLogs[newCard.id] = { cardIds: [card.id, other.id] };
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
