import Field from './field';

export default class Game {
  field: Field;
  totScore = 0;

  constructor(size: number) {
    this.field = new Field(size);
  }

  init() {
    this.field.init();
  }

  move(direction: 'U' | 'D' | 'L' | 'R') {
    // 한 턴이 끝나면 merge logs 초기화
    this.field.clearMergeLogs();

    const before = this.field.clone();

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

    // 점수 계산
    const score = this.calcScore();
    score && (this.totScore += score);

    if (this.field.isFull()) {
      // 게임 필드가 꽉 찼으면 게임 종료!
      return;
    }

    if (!this.field.equals(before)) {
      // 이전과 상태가 달라진 경우에만 새로운 카드 추가
      this.field.addNewCard();
    }

    this.field.printMap();
  }

  calcScore(): number {
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
