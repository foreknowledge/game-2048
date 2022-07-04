export interface Card {
  num: number;
  row: number;
  col: number;
}

export function generateCard(row: number, col: number): Card {
  const random = getRandomInt(10);
  // 10% 확률로 4, 90% 확률로 2
  const num = random < 1 ? 4 : 2;

  return { num, row, col };
}

export function generateTwoCards(tileSize: number): [Card, Card] {
  const first = genCardInRandomPos(tileSize);
  while (true) {
    const second = genCardInRandomPos(tileSize);
    if (first.row !== second.row || first.col !== second.col) {
      return [first, second];
    }
  }
}

function genCardInRandomPos(tileSize: number): Card {
  const totalTiles = tileSize * tileSize;
  const pos = Math.floor(Math.random() * totalTiles);
  const row = Math.floor(pos / tileSize);
  const col = pos % tileSize;

  return generateCard(row, col);
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}
