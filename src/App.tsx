import { useEffect } from 'react';
import styles from './App.module.css';
import GameField from './components/game_field/game_field';
import Header from './components/header/header';
import Game from './service/game';

function App({ game }: { game: Game }) {
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
    <div className={styles.container}>
      <Header score={0} best={0} />
      <GameField />
      <div className={styles.footer}>
        <button className={styles.btn_reset}>RESET</button>
      </div>
    </div>
  );
}

export default App;
