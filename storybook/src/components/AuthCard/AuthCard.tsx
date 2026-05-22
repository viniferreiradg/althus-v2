import { ReactNode } from 'react';
import { Logo } from '../Logo/Logo';
import styles from './AuthCard.module.css';

export interface AuthCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function AuthCard({ title, description, children }: AuthCardProps) {
  return (
    <div className={styles.page}>
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.card}>
        <div className={styles.logoWrap}>
          <Logo size="sm" />
        </div>
        <div className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
