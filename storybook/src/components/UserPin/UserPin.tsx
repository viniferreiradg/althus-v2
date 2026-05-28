import React from 'react';
import { User } from 'lucide-react';
import styles from './UserPin.module.css';

export interface UserPinProps {
  className?: string;
  'aria-label'?: string;
}

export function UserPin({
  className,
  'aria-label': ariaLabel = 'Sua localização',
}: UserPinProps) {
  return (
    <div
      className={[styles.userPin, className].filter(Boolean).join(' ')}
      role="img"
      aria-label={ariaLabel}
    >
      <User size={18} />
    </div>
  );
}
