import styles from './App.module.css';
import GameField from './components/game_field/game_field';
import Header from './components/header/header';

function App() {
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
