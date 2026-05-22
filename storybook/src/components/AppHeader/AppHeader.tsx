import styles from './AppHeader.module.css';
import { Logo } from '../Logo/Logo';

export function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Logo className={styles.logo} />
      </div>
    </header>
  );
}
