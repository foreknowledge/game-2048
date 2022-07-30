import Field from './field';
import { setOffset } from './id_generator';

export default class Game {
  field: Field;
  private totScore = 0;
  private bestScore = 0;
  private mode: 'tile' | 'score' = 'tile';

  constructor(size: number) {
    this.field = new Field(size);
  }

  init() {
    this.field.init();
  }

  reset() {
    this.totScore = 0;
    this.mode = 'tile';
    this.field.reset();
  }

  restore(other: Game) {
    this.totScore = other.totScore;
    this.bestScore = other.bestScore;
    this.mode = other.mode;
    this.field.restore(other.field);

    const maxId = Math.max(...this.field.getAllCards().map((card) => card.id));
    setOffset(maxId);
  }

  move(direction: 'U' | 'D' | 'L' | 'R'): [Field, Field] {
    // 한 턴이 끝나면 merge logs 초기화
    this.field.clearMergeLogs();

    const before = this.field.clone();
    this.field.moveField(direction);

    // 점수 갱신
    const score = this.calcScore();
    if (score) {
      this.totScore += score;
      if (this.bestScore < this.totScore) {
        this.bestScore = this.totScore;
      }
    }

    return [before, this.field];
  }

  getScores(): { score: number; best: number } {
    return { score: this.totScore, best: this.bestScore };
  }

  getStatus(): 'playing' | 'lose' | 'win' {
    const result = 'playing';

    // 타일 모드인 경우, 2048 타일이 만들어졌으면 게임 승리.
    if (
      this.mode === 'tile' &&
      this.field.getAllCards().some((card) => card.num === 2048)
    ) {
      return 'win';
    }

    // 움직일 타일이 있으면 게임 진행.
    const orgField = this.field.clone();
    for (let dir of ['U', 'R', 'D', 'L']) {
      const targetField = orgField.clone();
      targetField.moveField(dir as 'U' | 'D' | 'L' | 'R');
      if (!targetField.equals(orgField)) {
        return result;
      }
    }

    // 움직일 타일이 없으면 게임 종료.
    return 'lose';
  }

  changeScoreMode() {
    this.mode = 'score';
  }

  addRandomCard() {
    this.field.addRandomCard();
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
