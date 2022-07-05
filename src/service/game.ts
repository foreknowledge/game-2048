import { generateCard } from './card';
import Field from './field';

export default class Game {
  field: Field;

  constructor(size: number) {
    this.field = new Field(size);
  }

  init() {
    this.field.init();
  }

  move(direction: 'U' | 'D' | 'L' | 'R') {
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

    if (!this.field.equals(before)) {
      // 이전과 상태가 달라진 경우에만 새로운 카드 추가
      this.field.addCard(generateCard());
    }

    this.field.printMap();
  }
}
