let genCount = 0;

export function generateId(): number {
  return ++genCount;
}

export function setOffset(offset: number) {
  genCount = offset;
}
