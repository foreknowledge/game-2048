import { useEffect, useState } from 'react';
import styles from './App.module.css';
import GameField from './components/game_field/game_field';
import Header from './components/header/header';
import Game from './service/game';

function App({ game }: { game: Game }) {
  const [direction, setDirection] = useState<
    'U' | 'D' | 'L' | 'R' | undefined
  >();
  const [field, setField] = useState(game.field.clone());
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [gameState, setGameState] = useState({ isOver: false, win: false });

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        setDirection('U');
        break;
      case 'ArrowDown':
        setDirection('D');
        break;
      case 'ArrowLeft':
        setDirection('L');
        break;
      case 'ArrowRight':
        setDirection('R');
        break;
    }
  };

  useEffect(() => {
    if (!direction || gameState.isOver) return;

    const [before, after] = game.move(direction);

    // 이동한 경우에만 새로운 카드 추가
    if (!before.equals(after)) {
      game.addRandomCard();
      setField(after.clone());
    }

    // 게임 종료 확인
    setGameState(game.isGameOver());

    // 점수 설정
    setScore(game.totScore);
    setBest(game.bestScore);

    // 데이터 백업
    localStorage.backup = JSON.stringify(game);
  }, [direction]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // 데이터 복원.
    if (localStorage.backup) {
      game.restore(JSON.parse(localStorage.backup));

      setScore(game.totScore);
      setBest(game.bestScore);
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

  return (
    <div className={styles.container}>
      <Header score={score} best={best} />
      <div className={styles.gameField}>
        <GameField field={field} />
        <div
          className={`${styles.gameOver} ${
            gameState.isOver ? styles.show : ''
          }`}
        >
          <div className={styles.message}>
            {gameState.win ? 'You win! 🎉' : 'Game Over 😝'}
          </div>
          <button className={styles.button}>
            {gameState.win ? 'Continue' : 'Try again'}
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
