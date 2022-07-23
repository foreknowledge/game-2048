import { generateId } from './id_generator';

export interface Card {
  id: number;
  num: number;
}

export function generateCard(num?: number): Card {
  const id = generateId();

  const random = getRandomInt(10);
  // 10% 확률로 4, 90% 확률로 2
  const randomNum = random < 1 ? 4 : 2;

  return { id, num: num ?? randomNum };
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}
