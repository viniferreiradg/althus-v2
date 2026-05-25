import { InputHTMLAttributes } from 'react';
import styles from './Toggle.module.css';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  checked?: boolean;
  size?: 'sm' | 'md';
}

export function Toggle({ label, checked = false, disabled = false, size = 'md', onChange, id, ...props }: ToggleProps) {
  const toggleId = id ?? `toggle-${Math.random().toString(36).slice(2)}`;
  return (
    <label
      className={[
        styles.toggleWrapper,
        size === 'sm' ? styles.toggleSm : '',
        checked ? styles.toggleChecked : '',
        disabled ? styles.toggleDisabled : '',
      ].filter(Boolean).join(' ')}
      htmlFor={toggleId}
    >
      <input
        type="checkbox"
        id={toggleId}
        className={styles.toggleInput}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        role="switch"
        aria-checked={checked}
        {...props}
      />
      <span className={styles.toggleTrack}><span className={styles.toggleThumb} /></span>
      {label && <span className={styles.toggleLabel}>{label}</span>}
    </label>
  );
}
