import styles from './game_field.module.css';

const GameField = () => {
  return (
    <section className={styles.gameField}>
      <div className={styles.game_grid}></div>
    </section>
  );
};

export default GameField;
