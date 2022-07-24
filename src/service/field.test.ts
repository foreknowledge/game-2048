import { generateCard } from './card';
import Field from './field';

describe('Testing move() in Field', () => {
  test('moveUp', () => {
    const field = new Field(4);
    field.setCard(generateCard(2), { row: 0, col: 0 });
    field.setCard(generateCard(2), { row: 1, col: 0 });
    field.setCard(generateCard(2), { row: 2, col: 0 });
    field.setCard(generateCard(2), { row: 3, col: 0 });

    field.moveField('U');
    expect(field.getCard({ row: 0, col: 0 })!.num).toBe(4);
    expect(field.getCard({ row: 1, col: 0 })!.num).toBe(4);
  });

  test('moveDown', () => {
    const field = new Field(4);
    field.setCard(generateCard(2), { row: 0, col: 0 });
    field.setCard(generateCard(2), { row: 1, col: 0 });
    field.setCard(generateCard(2), { row: 2, col: 0 });
    field.setCard(generateCard(2), { row: 3, col: 0 });

    field.moveField('D');
    expect(field.getCard({ row: 2, col: 0 })!.num).toBe(4);
    expect(field.getCard({ row: 3, col: 0 })!.num).toBe(4);
  });

  test('moveLeft', () => {
    const field = new Field(4);
    field.setCard(generateCard(2), { row: 0, col: 0 });
    field.setCard(generateCard(2), { row: 0, col: 1 });
    field.setCard(generateCard(2), { row: 0, col: 2 });
    field.setCard(generateCard(2), { row: 0, col: 3 });

    field.moveField('L');
    expect(field.getCard({ row: 0, col: 0 })!.num).toBe(4);
    expect(field.getCard({ row: 0, col: 1 })!.num).toBe(4);
  });

  test('moveRight', () => {
    const field = new Field(4);
    field.setCard(generateCard(2), { row: 0, col: 0 });
    field.setCard(generateCard(2), { row: 0, col: 1 });
    field.setCard(generateCard(2), { row: 0, col: 2 });
    field.setCard(generateCard(2), { row: 0, col: 3 });

    field.moveField('R');
    expect(field.getCard({ row: 0, col: 2 })!.num).toBe(4);
    expect(field.getCard({ row: 0, col: 3 })!.num).toBe(4);
  });
});

export {};
