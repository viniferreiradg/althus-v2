import styles from './PasswordStrength.module.css';

export interface PasswordStrengthProps {
  value: string;
}

function getScore(value: string): number {
  if (!value) return 0;
  let score = 0;
  if (value.length >= 8)           score++;
  if (/[A-Z]/.test(value))        score++;
  if (/[0-9]/.test(value))        score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  return score;
}

const LEVELS = ['', 'weak', 'medium', 'medium', 'strong'] as const;
const LABELS = ['', 'Fraca', 'Média', 'Boa', 'Forte'];

export function PasswordStrength({ value }: PasswordStrengthProps) {
  const score = getScore(value);

  return (
    <div className={styles.root}>
      <div className={styles.bars}>
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            className={[styles.bar, i < score ? styles[LEVELS[score]] : ''].filter(Boolean).join(' ')}
          />
        ))}
      </div>
      {value && <span className={styles.strengthLabel}>{LABELS[score]}</span>}
    </div>
  );
}
