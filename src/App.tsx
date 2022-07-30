import { useCallback, useEffect, useState } from 'react';
import styles from './App.module.css';
import GameField from './components/game_field/game_field';
import Header from './components/header/header';
import Game from './service/game';

let isGameOver = false;
function App({ game }: { game: Game }) {
  const [field, setField] = useState(game.field.clone());
  const [gameStatus, setGameStatus] = useState(game.getStatus());
  const [gameScores, setGameScores] = useState({ score: 0, best: 0 });

  const handleChangeDirection = useCallback(
    (direction: 'U' | 'D' | 'L' | 'R') => {
      if (isGameOver) return;

      const [before, after] = game.move(direction);

      if (before.equals(after)) return;

      game.addRandomCard();
      setField(game.field.clone());

      // 현재 게임 정보 설정
      const gameStatus = game.getStatus();
      setGameStatus(gameStatus);
      setGameScores(game.getScores());
      isGameOver = gameStatus !== 'playing';

      // 데이터 백업
      localStorage.backup = JSON.stringify(game);
    },
    [game]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const direction = getKeyDirection(e);

      if (!direction) return;
      handleChangeDirection(direction);
    };

    window.addEventListener('keydown', handleKeyDown);

    // 데이터 복원.
    if (localStorage.backup) {
      game.restore(JSON.parse(localStorage.backup));

      const gameStatus = game.getStatus();
      setGameScores(game.getScores());
      isGameOver = gameStatus !== 'playing';
      setField(game.field.clone());
    }

    // cleanup this component
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [game, handleChangeDirection]);

  const onReset = () => {
    game.reset();
    localStorage.backup = JSON.stringify(game);

    window.location.reload();
  };

  const onBtnClick = () => {
    if (gameStatus == 'win') {
      game.changeScoreMode();
      setGameStatus('playing');
      isGameOver = false;
    } else {
      onReset();
    }
  };

  return (
    <div className={styles.container}>
      <Header score={gameScores.score} best={gameScores.best} />
      <div className={styles.gameField}>
        <GameField field={field} />
        <div
          className={`${styles.gameOver} ${
            gameStatus !== 'playing' ? styles.show : ''
          }`}
        >
          <div className={styles.message}>
            {gameStatus == 'win' ? 'You win! 🎉' : 'Game Over 😝'}
          </div>
          <button className={styles.button} onClick={onBtnClick}>
            {gameStatus == 'win' ? 'Continue' : 'Try again'}
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

function getKeyDirection(e: KeyboardEvent): 'U' | 'D' | 'L' | 'R' | undefined {
  switch (e.key) {
    case 'ArrowUp':
      return 'U';
    case 'ArrowDown':
      return 'D';
    case 'ArrowLeft':
      return 'L';
    case 'ArrowRight':
      return 'R';
  }
}
