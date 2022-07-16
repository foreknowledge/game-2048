import styles from './card.module.css';

export type UICard = {
  top: number;
  left: number;
  size: number;
  id: number;
  num: number;
};

const Card = ({ uiCard }: { uiCard: UICard }) => {
  return (
    <div
      className={`${styles.card} ${getCardStyle(uiCard.num)} `}
      style={{
        top: uiCard.top,
        left: uiCard.left,
        width: uiCard.size,
        height: uiCard.size,
      }}
    >
      {uiCard.num}
    </div>
  );
};

export default Card;

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
