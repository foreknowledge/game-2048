import { Card, generateCard } from './card';
import Game from './game';
import Square from './square';

describe('Testing move() in Game', () => {
  test('moveUp', () => {
    const square = new Square<Card>(4);
    square.setCol(0, [
      generateCard(2),
      generateCard(2),
      generateCard(2),
      generateCard(2),
    ]);

    const game = new Game(4);
    game.field.square = square;
    game.move('U');
    expect(square.getCol(0)[0]).toEqual({ num: 4 });
    expect(square.getCol(0)[1]).toEqual({ num: 4 });
  });

  test('moveDown', () => {
    const square = new Square<Card>(4);
    square.setCol(0, [
      generateCard(2),
      generateCard(2),
      generateCard(2),
      generateCard(2),
    ]);

    const game = new Game(4);
    game.field.square = square;
    game.move('D');
    expect(square.getCol(0)[2]).toEqual({ num: 4 });
    expect(square.getCol(0)[3]).toEqual({ num: 4 });
  });

  test('moveLeft', () => {
    const square = new Square<Card>(4);
    square.setRow(0, [
      generateCard(2),
      generateCard(2),
      generateCard(2),
      generateCard(2),
    ]);

    const game = new Game(4);
    game.field.square = square;
    game.move('L');
    expect(square.getRow(0)[0]).toEqual({ num: 4 });
    expect(square.getRow(0)[1]).toEqual({ num: 4 });
  });

  test('moveRight', () => {
    const square = new Square<Card>(4);
    square.setRow(0, [
      generateCard(2),
      generateCard(2),
      generateCard(2),
      generateCard(2),
    ]);

    const game = new Game(4);
    game.field.square = square;
    game.move('R');
    expect(square.getRow(0)[2]).toEqual({ num: 4 });
    expect(square.getRow(0)[3]).toEqual({ num: 4 });
  });
});

export {};
