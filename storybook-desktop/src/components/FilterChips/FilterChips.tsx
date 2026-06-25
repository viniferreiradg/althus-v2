import { ReactNode } from 'react';
import styles from './FilterChips.module.css';

export interface FilterChipOption {
  label: string;
  value: string;
  icon?: ReactNode;
}

export interface FilterChipsProps {
  options: FilterChipOption[];
  activeValue: string;
  onChange: (value: string) => void;
  className?: string;
}

export function FilterChips({ options, activeValue, onChange, className }: FilterChipsProps) {
  return (
    <div className={[styles.filterChips, className ?? ''].join(' ').trim()}>
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          className={[styles.filterChip, opt.value === activeValue ? styles.active : ''].join(' ').trim()}
          onClick={() => onChange(opt.value)}
        >
          {opt.icon}
          {opt.label}
        </button>
      ))}
    </div>
  );
}
