import styles from './header.module.css';

const Header = (props: { score: number; best: number }) => (
  <>
    <h1 className={styles.title}>2048</h1>
    <div className={styles.scores}>
      <div className={styles.scoreBox}>
        <div className={styles.scoreTitle}>SCORE</div>
        <div className={styles.scoreValue}>{props.score}</div>
      </div>
      <div className={styles.scoreBox}>
        <div className={styles.scoreTitle}>BEST</div>
        <div className={styles.scoreValue}>{props.best}</div>
      </div>
    </div>
  </>
);

export default Header;
