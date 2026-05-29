import React from 'react';
import { Car, ChevronDown } from 'lucide-react';
import styles from './VehicleChip.module.css';

export interface VehicleChipProps {
  name: string;
  className?: string;
  onClick?: () => void;
}

export function VehicleChip({ name, className, onClick }: VehicleChipProps) {
  return (
    <button
      className={[styles.vehicleChip, className].filter(Boolean).join(' ')}
      onClick={onClick}
      type="button"
      aria-label={`Veículo selecionado: ${name}. Toque para trocar.`}
    >
      <span className={styles.iconWrap} aria-hidden="true">
        <Car size={16} />
      </span>
      <span className={styles.name}>{name}</span>
      <ChevronDown className={styles.chevron} size={14} />
    </button>
  );
}
