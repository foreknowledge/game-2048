import styles from './game_field.module.css';

const GameField = () => {
  return (
    <section className={styles.gameField}>
      <div className={styles.gameGrid}></div>
    </section>
  );
};

export default GameField;
