import { InputHTMLAttributes, ReactNode, useState } from 'react';
import { CircleX, CircleCheck, Eye, EyeOff } from 'lucide-react';
import styles from './Input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  toggleable?: boolean;
}

export function Input({ label, helperText, error, success, iconLeft, iconRight, toggleable, className, id, type, ...props }: InputProps) {
  const [visible, setVisible] = useState(false);
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  const resolvedType = toggleable ? (visible ? 'text' : 'password') : type;
  const hasRight = toggleable || !!iconRight;

  const wrapClass = [
    styles.inputWrap,
    iconLeft ? styles.hasLeft : '',
    hasRight ? styles.hasRight : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={[styles.wrapper, error ? styles.error : '', className ?? ''].filter(Boolean).join(' ')}>
      {label && <label className={styles.label} htmlFor={inputId}>{label}</label>}
      <div className={wrapClass}>
        {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}
        <input id={inputId} className={styles.input} type={resolvedType} {...props} />
        {toggleable ? (
          <button
            type="button"
            className={styles.iconRightBtn}
            onClick={() => setVisible(v => !v)}
            aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {visible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        ) : (
          iconRight && <span className={styles.iconRight}>{iconRight}</span>
        )}
      </div>
      {error && (
        <span className={styles.errorText}>
          <CircleX size={14} className={styles.msgIcon} />
          {error}
        </span>
      )}
      {!error && success && (
        <span className={styles.successText}>
          <CircleCheck size={14} className={styles.msgIcon} />
          {success}
        </span>
      )}
      {!error && !success && helperText && <span className={styles.helperText}>{helperText}</span>}
    </div>
  );
}
