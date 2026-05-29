import React from 'react';
import { Search } from 'lucide-react';
import styles from './SearchBar.module.css';

export interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onClick?: () => void;
}

export function SearchBar({
  placeholder = 'Buscar estação de recarga',
  className,
  onClick,
}: SearchBarProps) {
  return (
    <button
      className={[styles.searchBar, className].filter(Boolean).join(' ')}
      onClick={onClick}
      aria-label={placeholder}
      type="button"
    >
      <Search className={styles.icon} size={18} />
      <span className={styles.placeholder}>{placeholder}</span>
    </button>
  );
}
