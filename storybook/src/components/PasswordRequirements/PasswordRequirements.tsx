import { CircleCheck, CircleX } from 'lucide-react';
import styles from './PasswordRequirements.module.css';

export interface PasswordRequirementsProps {
  value: string;
}

const REQUIREMENTS = [
  { key: 'length',    label: 'No mínimo 8 caracteres', test: (v: string) => v.length >= 8 },
  { key: 'uppercase', label: 'Letra maiúscula',         test: (v: string) => /[A-Z]/.test(v) },
  { key: 'lowercase', label: 'Letra minúscula',         test: (v: string) => /[a-z]/.test(v) },
  { key: 'number',    label: 'Número',                  test: (v: string) => /[0-9]/.test(v) },
  { key: 'symbol',    label: 'Símbolo (ex: !@,#)',      test: (v: string) => /[^A-Za-z0-9]/.test(v) },
] as const;

export function PasswordRequirements({ value }: PasswordRequirementsProps) {
  const hasTyped = value.length > 0;
  const results  = REQUIREMENTS.map(r => ({ ...r, met: hasTyped ? r.test(value) : null }));
  const allMet   = hasTyped && results.every(r => r.met);
  const anyFailed = hasTyped && results.some(r => !r.met);

  return (
    <div className={styles.root}>
      <p className={[
        styles.title,
        allMet    ? styles.titleSuccess : '',
        anyFailed ? styles.titleError   : '',
      ].filter(Boolean).join(' ')}>
        A senha deve conter:
      </p>
      <ul className={styles.list}>
        {results.map(({ key, label, met }) => (
          <li key={key} className={[
            styles.item,
            met === true  ? styles.itemSuccess : '',
            met === false ? styles.itemError   : '',
          ].filter(Boolean).join(' ')}>
            <span className={styles.iconWrap}>
              {met === null  && <span className={styles.bullet} />}
              {met === true  && <CircleCheck size={14} />}
              {met === false && <CircleX size={14} />}
            </span>
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
