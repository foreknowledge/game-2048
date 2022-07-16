import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Field from '../../service/field';
import Card, { UICard } from '../card/card';
import styles from './game_field.module.css';

const GameField = ({ field }: { field: Field }) => {
  const [tileSize, setTileSize] = useState(0);
  const [uiCards, setUICards] = useState<UICard[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const grid = gridRef.current;
    const mergedUICards: UICard[] = [];
    const newUICards: UICard[] = field.getAllCards().map((card) => {
      const { row, col } = field.getCardPos(card.id)!;
      const tile = grid.children[row * field.size + col] as HTMLElement;

      const mergeLog = field.getMergeLog(card.id);
      if (mergeLog) {
        mergeLog.cardIds.forEach((id) => {
          const prevUICard = uiCards.find((uiCard) => uiCard.id === id)!;
          mergedUICards.push({
            ...prevUICard,
            top: tile.offsetTop,
            left: tile.offsetLeft,
            size: tileSize,
            type: 'move',
          });
        });
      }

      const prevUICard = uiCards.find((uiCard) => uiCard.id === card.id);
      // New or Merged
      return {
        top: tile.offsetTop,
        left: tile.offsetLeft,
        size: tileSize,
        id: card.id,
        num: card.num,
        type: prevUICard ? 'move' : mergeLog ? 'merge' : 'new',
      };
    });

    setUICards([...mergedUICards, ...newUICards]);
  }, [gridRef.current, field]);

  useLayoutEffect(() => {
    // tile size가 결정된 후에 카드를 그려야 하므로 useLayoutEffect 안에서 tile size를 설정한다.
    const newTileSize =
      gridRef.current?.children[0].getBoundingClientRect().width ?? 0;
    setTileSize(newTileSize);
  }, []);

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
      {uiCards.map((uiCard) => (
        <Card key={uiCard.id} uiCard={uiCard} />
      ))}
    </section>
  );
};

export default GameField;
