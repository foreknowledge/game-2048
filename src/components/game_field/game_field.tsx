import { TouchEvent, useEffect, useRef, useState } from 'react';
import Field from '../../service/field';
import GameCard, { UICard } from '../game_card/game_card';
import styles from './game_field.module.css';

type Props = {
  field: Field;
  onFieldTouchStarted: (e: TouchEvent<HTMLTableSectionElement>) => void;
  onFieldTouchMoved: (e: TouchEvent<HTMLTableSectionElement>) => void;
};

let tileSize = 0;
const GameField = ({
  field,
  onFieldTouchStarted,
  onFieldTouchMoved,
}: Props) => {
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
  }, [tileSize, field]);

  useEffect(() => {
    // tile size 계산
    tileSize = gridRef.current?.children[0].getBoundingClientRect().width ?? 0;
  }, []);

  return (
    <section
      onTouchStart={onFieldTouchStarted}
      onTouchMove={onFieldTouchMoved}
      className={styles.gameField}
    >
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
        <GameCard key={uiCard.id} uiCard={uiCard} />
      ))}
    </section>
  );
};

export default GameField;
