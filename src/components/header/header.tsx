import { memo, useEffect, useRef } from 'react';
import styles from './header.module.css';

let beforeScore = 0;
let timer: ReturnType<typeof setTimeout> | null = null;
const Header = memo(({ score, best }: { score: number; best: number }) => {
  const diffRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    beforeScore = score;
    timer && clearTimeout(timer);

    if (!diffRef.current) return;
    const diffElement = diffRef.current;

    prepareAnimation(diffElement);
    setTimeout(() => {
      startAnimation(diffElement);

      timer = setTimeout(() => {
        endAnimation(diffElement);
      }, 700);
    });
  }, [score]);

  return (
    <>
      <h1 className={styles.title}>2048</h1>
      <div className={styles.scores}>
        <div className={styles.scoreBox}>
          <div className={styles.scoreContainer}>
            <div className={styles.scoreTitle}>SCORE</div>
            <div className={styles.scoreValue}>{score}</div>
            <div ref={diffRef} className={styles.diffValue}>
              +{score - beforeScore}
            </div>
          </div>
        </div>
        <div className={styles.scoreBox}>
          <div className={styles.scoreTitle}>BEST</div>
          <div className={styles.scoreValue}>{best}</div>
        </div>
      </div>
    </>
  );
});

export default Header;

function prepareAnimation(element: HTMLDivElement) {
  element.style.opacity = '1';
  element.style.transform = 'translateY(0)';
  element.style.transition = 'none';
}

function startAnimation(element: HTMLDivElement) {
  element.style.opacity = '0';
  element.style.transform = 'translateY(-80px)';
  element.style.transition = 'all 700ms cubic-bezier(0.5, 0, 1, 0.5)';
}

function endAnimation(element: HTMLDivElement) {
  element.style.opacity = '0';
}
