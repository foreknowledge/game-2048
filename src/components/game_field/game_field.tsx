import Field from '../../service/field';
import styles from './game_field.module.css';

const GameField = ({ field }: { field: Field }) => {
  return (
    <section className={styles.gameField}>
      <div className={styles.gameGrid}>
        {[...Array(field.size * field.size).keys()].map((i) => (
          <div key={i} className={styles.gameTile} />
        ))}
      </div>
    </section>
  );
};

export default GameField;
