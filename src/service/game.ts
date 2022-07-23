import Field from './field';
import { setOffset } from './id_generator';

export default class Game {
  field: Field;
  totScore = 0;
  bestScore = 0;

  constructor(size: number) {
    this.field = new Field(size);
  }

  init() {
    this.field.init();
  }

  restore(other: Game) {
    this.totScore = other.totScore;
    this.bestScore = other.bestScore;
    this.field.restore(other.field);

    const maxId = Math.max(...this.field.getAllCards().map((card) => card.id));
    setOffset(maxId);
  }

  move(direction: 'U' | 'D' | 'L' | 'R'): [Field, Field] {
    // 한 턴이 끝나면 merge logs 초기화
    this.field.clearMergeLogs();

    const before = this.field.clone();
    this.moveField(direction);

    // 점수 계산
    const score = this.calcScore();
    if (score) {
      this.totScore += score;
      if (this.bestScore < this.totScore) {
        this.bestScore = this.totScore;
      }
    }

    return [before, this.field];
  }

  addRandomCard() {
    this.field.addRandomCard();
  }

  private moveField(direction: 'U' | 'D' | 'L' | 'R') {
    switch (direction) {
      case 'U':
        this.field.moveUp();
        break;
      case 'D':
        this.field.moveDown();
        break;
      case 'L':
        this.field.moveLeft();
        break;
      case 'R':
        this.field.moveRight();
        break;
    }
  }

  private calcScore(): number {
    return this.field
      .getAllCards()
      .map((card) => {
        const mergeLog = this.field.getMergeLog(card.id);
        if (mergeLog) return card.num;
        else return 0;
      })
      .reduce((sum, current) => sum + current);
  }
}
