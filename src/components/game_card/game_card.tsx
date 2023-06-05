import { useEffect, useState } from 'react';
import styles from './game_card.module.css';

export type UICard = {
  top: number;
  left: number;
  size: number;
  id: number;
  num: number;
  type: 'new' | 'move' | 'merge';
};

const GameCard = ({ uiCard }: { uiCard: UICard }) => {
  const newAnim = uiCard.type === 'new' ? styles.appear : '';
  const mergeAnim = uiCard.type === 'merge' ? styles.merge : '';
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    // 카드 위치 이동
    setPos({ top: uiCard.top, left: uiCard.left });
  }, [uiCard]);

  return (
    <div
      className={`${styles.card} ${getCardStyle(
        uiCard.num
      )} ${newAnim} ${mergeAnim}`}
      style={{
        width: uiCard.size,
        height: uiCard.size,
        top: `${pos.top}px`,
        left: `${pos.left}px`,
      }}
    >
      {uiCard.num}
    </div>
  );
};

export default GameCard;

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
