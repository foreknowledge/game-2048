import { useEffect, useState } from 'react';
import styles from './App.module.css';
import GameField from './components/game_field/game_field';
import Header from './components/header/header';
import Game from './service/game';

function App({ game }: { game: Game }) {
  const [field, setField] = useState(game.field.clone());
  const [gameStatus, setGameStatus] = useState({
    score: 0,
    best: 0,
    isOver: false,
    win: false,
  });

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

    if (!direction) return;

    const [before, after] = game.move(direction);

    if (before.equals(after)) return;

    game.addRandomCard();
    setField(game.field.clone());

    // 현재 게임 정보 설정
    setGameStatus(game.getStatus());

    // 데이터 백업
    localStorage.backup = JSON.stringify(game);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // 데이터 복원.
    if (localStorage.backup) {
      game.restore(JSON.parse(localStorage.backup));

      setGameStatus(game.getStatus());
      setField(game.field.clone());
    }

    // cleanup this component
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const onReset = () => {
    game.reset();
    localStorage.backup = JSON.stringify(game);

    window.location.reload();
  };

  const onBtnClick = () => {
    if (gameStatus.win) {
      game.changeScoreMode();
      setGameStatus({ ...gameStatus, isOver: false, win: false });
    } else {
      onReset();
    }
  };

  return (
    <div className={styles.container}>
      <Header score={gameStatus.score} best={gameStatus.best} />
      <div className={styles.gameField}>
        <GameField field={field} />
        <div
          className={`${styles.gameOver} ${
            gameStatus.isOver ? styles.show : ''
          }`}
        >
          <div className={styles.message}>
            {gameStatus.win ? 'You win! 🎉' : 'Game Over 😝'}
          </div>
          <button className={styles.button} onClick={onBtnClick}>
            {gameStatus.win ? 'Continue' : 'Try again'}
          </button>
        </div>
      </div>
      <div className={styles.footer}>
        <button className={styles.btnReset} onClick={onReset}>
          RESET
        </button>
      </div>
    </div>
  );
}

export default App;
