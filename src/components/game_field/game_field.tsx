import { useEffect } from 'react';
import Game from '../../service/game';
import styles from './game_field.module.css';

const GameField = ({ game }: { game: Game }) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        console.log(game.move('U'));
        break;
      case 'ArrowDown':
        console.log(game.move('D'));
        break;
      case 'ArrowLeft':
        console.log(game.move('L'));
        break;
      case 'ArrowRight':
        console.log(game.move('R'));
        break;
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
