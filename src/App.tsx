import { TouchEvent, useCallback, useEffect, useState } from 'react';
import styles from './App.module.css';
import GameField from './components/game_field/game_field';
import Header from './components/header/header';
import Game from './service/game';

let isGameOver = false;
function App({ game }: { game: Game }) {
  const [field, setField] = useState(game.field.clone());
  const [gameStatus, setGameStatus] = useState(game.getStatus());
  const [gameScores, setGameScores] = useState({ score: 0, best: 0 });
  const [isVisible, setVisible, fadeProps] = useFade();

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
      setVisible(isGameOver);

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
      setVisible(isGameOver);
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
    if (gameStatus === 'win') {
      game.changeScoreMode();
      setGameStatus('playing');
      isGameOver = false;
      setVisible(isGameOver);
    } else {
      onReset();
    }
  };

  const handleTouchMove = useCallback(
    (e: TouchEvent<HTMLTableSectionElement>) => {
      if (!xDown || !yDown || isGameOver) return;

      handleChangeDirection(getTouchDirection(e));

      // reset values
      xDown = 0;
      yDown = 0;
    },
    []
  );

  return (
    <div className={styles.container}>
      <Header score={gameScores.score} best={gameScores.best} />
      <div className={styles.gameField}>
        <GameField
          field={field}
          onFieldTouchStarted={handleTouchStart}
          onFieldTouchMoved={handleTouchMove}
        />
        {isVisible && (
          <div className={styles.gameOver} {...fadeProps}>
            <div className={styles.message}>
              {gameStatus === 'win' ? 'You win! 🎉' : 'Game Over 😝'}
            </div>
            <button className={styles.button} onClick={onBtnClick}>
              {gameStatus === 'win' ? 'Continue' : 'Try again'}
            </button>
          </div>
        )}
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

function useFade() {
  const [show, setShow] = useState(false);
  const [isVisible, setVisible] = useState(show);

  useEffect(() => {
    if (show) setVisible(true);
  }, [show]);

  const fadeProps = {
    style: { animation: `${show ? styles.fadeIn : styles.fadeOut} .3s` },
    onAnimationEnd: () => {
      if (!show) setVisible(false);
    },
  };

  return [isVisible, setShow, fadeProps] as const;
}

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

let xDown: number = 0;
let yDown: number = 0;

function handleTouchStart(e: TouchEvent<HTMLTableSectionElement>) {
  const firstTouch = e.targetTouches[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function getTouchDirection(e: TouchEvent<HTMLTableSectionElement>) {
  var xUp = e.targetTouches[0].clientX;
  var yUp = e.targetTouches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) return 'L';
    else return 'R';
  } else {
    if (yDiff > 0) return 'U';
    else return 'D';
  }
}
