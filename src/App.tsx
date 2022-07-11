import { useEffect, useState } from 'react';
import styles from './App.module.css';
import GameField from './components/game_field/game_field';
import Header from './components/header/header';
import Game from './service/game';

function App({ game }: { game: Game }) {
  const [field, setField] = useState(game.getField().clone());

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
      game.move(direction);
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
    <div className={styles.container}>
      <Header score={0} best={0} />
      <GameField field={field} />
      <div className={styles.footer}>
        <button className={styles.btn_reset}>RESET</button>
      </div>
    </div>
  );
}

export default App;
