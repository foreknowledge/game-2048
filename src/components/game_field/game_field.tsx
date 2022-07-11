import { useLayoutEffect, useRef, useState } from 'react';
import Field from '../../service/field';
import styles from './game_field.module.css';

const GameField = ({ field }: { field: Field }) => {
  const [tileSize, setTileSize] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // tile size가 결정된 후에 카드를 그려야 하므로 useLayoutEffect 안에서 tile size를 설정한다.
    const newTileSize =
      gridRef.current?.children[0].getBoundingClientRect().width ?? 0;
    setTileSize(newTileSize);
  });

  return (
    <section className={styles.gameField}>
      <div
        ref={gridRef}
        className={styles.gameGrid}
        style={{ gridTemplateColumns: `repeat(${field.size} ,1fr)` }}
      >
        {[...Array(field.size * field.size).keys()].map((i) => (
          <div key={i} className={styles.gameTile} />
        ))}
      </div>
    </section>
  );
};

export default GameField;
