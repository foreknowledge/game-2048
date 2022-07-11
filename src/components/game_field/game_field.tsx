import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Field from '../../service/field';
import styles from './game_field.module.css';

type UICard = {
  top: number;
  left: number;
  id: number;
  num: number;
};

const GameField = ({ field }: { field: Field }) => {
  const [tileSize, setTileSize] = useState(0);
  const [uiCards, setUICards] = useState<UICard[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const grid = gridRef.current;
    const newUICards = field.getAllCards().map((card) => {
      const { row, col } = field.getCardPos(card.id)!;
      const tile = grid.children[row * field.size + col] as HTMLElement;
      return {
        top: tile.offsetTop,
        left: tile.offsetLeft,
        id: card.id,
        num: card.num,
      };
    });
    setUICards(newUICards);
  }, [gridRef.current, field]);

  useLayoutEffect(() => {
    // tile size가 결정된 후에 카드를 그려야 하므로 useLayoutEffect 안에서 tile size를 설정한다.
    const newTileSize =
      gridRef.current?.children[0].getBoundingClientRect().width ?? 0;
    setTileSize(newTileSize);
  });

  return (
    <section className={styles.gameField}>
      <div
        ref={gridRef}
        className={styles.gameGrid}
        style={{ gridTemplateColumns: `repeat(${field.size} ,1fr)` }}
      >
        {[...Array(field.size * field.size).keys()].map((i) => (
          <div key={i} className={styles.gameTile} />
        ))}
      </div>
      {uiCards.map((uiCard) => {
        return (
          <div
            key={uiCard.id}
            className={`${styles.card} ${getCardStyle(uiCard.num)}`}
            style={{
              top: uiCard.top,
              left: uiCard.left,
              width: tileSize,
              height: tileSize,
            }}
          >
            {uiCard.num}
          </div>
        );
      })}
    </section>
  );
};

export default GameField;

function getCardStyle(num: number): string {
  switch (num) {
    case 2:
      return styles.level1;
    case 4:
      return styles.level2;
    case 8:
      return styles.level3;
    case 16:
      return styles.level4;
    case 32:
      return styles.level5;
    case 64:
      return styles.level6;
    case 128:
      return styles.level7;
    case 256:
      return styles.level8;
    case 512:
      return styles.level9;
    default:
      return styles.level10;
  }
}
