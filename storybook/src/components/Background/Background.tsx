import React from 'react';
import styles from './Background.module.css';

interface BackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export function Background({ children, className }: BackgroundProps) {
  return (
    <div className={[styles.bgWrapper, className].filter(Boolean).join(' ')}>
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      {children}
    </div>
  );
}
