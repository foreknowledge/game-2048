import Game from './game';

describe('Testing move() in Game', () => {
  test('moveUp', () => {
    const game = new Game(4);
    game.field.setCol(0, [{ num: 2 }, { num: 2 }, { num: 2 }, { num: 2 }]);
    game.move('U');
    expect(game.field.getCol(0)[0]).toEqual({ num: 4 });
    expect(game.field.getCol(0)[1]).toEqual({ num: 4 });
  });

  test('moveDown', () => {
    const game = new Game(4);
    game.field.setCol(0, [{ num: 2 }, { num: 2 }, { num: 2 }, { num: 2 }]);
    game.move('D');
    expect(game.field.getCol(0)[2]).toEqual({ num: 4 });
    expect(game.field.getCol(0)[3]).toEqual({ num: 4 });
  });

  test('moveLeft', () => {
    const game = new Game(4);
    game.field.setRow(0, [{ num: 2 }, { num: 2 }, { num: 2 }, { num: 2 }]);
    game.move('L');
    expect(game.field.getRow(0)[0]).toEqual({ num: 4 });
    expect(game.field.getRow(0)[1]).toEqual({ num: 4 });
  });

  test('moveRight', () => {
    const game = new Game(4);
    game.field.setRow(0, [{ num: 2 }, { num: 2 }, { num: 2 }, { num: 2 }]);
    game.move('R');
    expect(game.field.getRow(0)[2]).toEqual({ num: 4 });
    expect(game.field.getRow(0)[3]).toEqual({ num: 4 });
  });
});

export {};
