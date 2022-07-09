import { Action } from './action';
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

  move(direction: 'U' | 'D' | 'L' | 'R'): Action[] {
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
      return [];
    }

    // merge log 분석해서 actions 생성
    const actions = this.analyzeMergeLog(before);

    if (!this.field.equals(before)) {
      // 이전과 상태가 달라진 경우에만 새로운 카드 추가
      const { row, col } = this.field.addNewCard();
      actions.push({ type: 'new', at: { row, col } });
    }

    this.field.printMap();

    return actions;
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

  private analyzeMergeLog(before: Field): Action[] {
    const result: Action[] = [];

    this.field.getAllCards().forEach((card) => {
      const mergeLog = this.field.getMergeLog(card.id);

      if (mergeLog) {
        const [cardId1, cardId2] = mergeLog.cardIds;
        const from1 = before.getCardPos(cardId1)!;
        const from2 = before.getCardPos(cardId2)!;
        const to = this.field.getCardPos(card.id)!;

        result.push({ type: 'merge', from1, from2, to });
      } else {
        const from = before.getCardPos(card.id)!;
        const to = this.field.getCardPos(card.id)!;

        result.push({ type: 'move', from, to });
      }
    });

    return result;
  }
}
