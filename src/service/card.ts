export interface Card {
  num: number;
}

export function generateCard(): Card {
  const random = getRandomInt(10);
  // 10% 확률로 4, 90% 확률로 2
  const num = random < 1 ? 4 : 2;

  return { num };
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}
