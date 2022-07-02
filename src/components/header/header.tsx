import styles from './header.module.css';

const Header = (props: { score: number; best: number }) => (
  <>
    <h1 className={styles.title}>2048</h1>
    <div className={styles.scores}>
      <div className={styles.score_box}>
        <div className={styles.score_title}>SCORE</div>
        <div className={styles.score_value}>{props.score}</div>
      </div>
      <div className={styles.score_box}>
        <div className={styles.score_title}>BEST</div>
        <div className={styles.score_value}>{props.best}</div>
      </div>
    </div>
  </>
);

export default Header;
