import { memo } from 'react';
import styles from './header.module.css';

const Header = memo(({ score, best }: { score: number; best: number }) => (
  <>
    <h1 className={styles.title}>2048</h1>
    <div className={styles.scores}>
      <div className={styles.scoreBox}>
        <div className={styles.scoreTitle}>SCORE</div>
        <div className={styles.scoreValue}>{score}</div>
      </div>
      <div className={styles.scoreBox}>
        <div className={styles.scoreTitle}>BEST</div>
        <div className={styles.scoreValue}>{best}</div>
      </div>
    </div>
  </>
));

export default Header;
