import { useEffect } from 'react';
import { Card } from '../../service/card';
import Field, { MergeLog } from '../../service/field';
import Game from '../../service/game';
import Pos from '../../service/pos';
import styles from './game_field.module.css';

const GameField = ({ game }: { game: Game }) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    let direction: 'U' | 'D' | 'L' | 'R' | undefined;
    switch (e.key) {
      case 'ArrowUp':
        direction = 'U';
        break;
      case 'ArrowDown':
        direction = 'D';
        break;
      case 'ArrowLeft':
        direction = 'L';
        break;
      case 'ArrowRight':
        direction = 'R';
        break;
    }

    if (direction) {
      const [before, after] = game.move(direction);
      doAction(before, after);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // cleanup this component
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <section className={styles.gameField}>
      <div className={styles.gameGrid}>
        {[...Array(game.field.size * game.field.size).keys()].map((i) => (
          <div key={i} className={styles.gameTile} />
        ))}
      </div>
    </section>
  );
};

export default GameField;

function doAction(before: Field, after: Field) {
  after.getAllCards().forEach((card) => {
    const mergeLog = after.getMergeLog(card.id);

    if (mergeLog) {
      doMerge(mergeLog, before, after, card);
    } else {
      const from = before.getCardPos(card.id);
      const to = after.getCardPos(card.id)!;
      if (from) {
        doMove(from, to, card);
      } else {
        doNew(to, card);
      }
    }
  });
}

function doMerge(mergeLog: MergeLog, before: Field, after: Field, card: Card) {
  const [cardId1, cardId2] = mergeLog.cardIds;
  const from1 = before.getCardPos(cardId1)!;
  const from2 = before.getCardPos(cardId2)!;
  const to = after.getCardPos(card.id)!;

  console.log(
    'merge',
    card.num,
    `(${from1.row},${from1.col})`,
    `(${from2.row},${from2.col})`,
    `(${to.row},${to.col})`
  );
}

function doMove(from: Pos, to: Pos, card: Card) {
  console.log(
    'move',
    card.num,
    `(${from.row},${from.col})`,
    `(${to.row},${to.col})`
  );
}

function doNew(at: Pos, card: Card) {
  console.log('new', card.num, `(${at.row},${at.col})`);
}
