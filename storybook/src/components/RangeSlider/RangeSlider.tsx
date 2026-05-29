import React from 'react';
import styles from './RangeSlider.module.css';

interface RangeSliderProps {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  valueMin: number;
  valueMax: number;
  unit?: string;
  onChangeMin?: (value: number) => void;
  onChangeMax?: (value: number) => void;
  className?: string;
}

export function RangeSlider({
  label,
  min = 0,
  max = 350,
  step = 10,
  valueMin,
  valueMax,
  unit = 'kW',
  onChangeMin,
  onChangeMax,
  className,
}: RangeSliderProps) {
  const pctMin = ((valueMin - min) / (max - min)) * 100;
  const pctMax = ((valueMax - min) / (max - min)) * 100;

  return (
    <div className={[styles.rangeSlider, className].filter(Boolean).join(' ')}>
      {label && (
        <div className={styles.rangeHeader}>
          <span className={styles.rangeLabel}>{label}</span>
          <span className={styles.rangeValue}>
            {valueMin} – {valueMax} {unit}
          </span>
        </div>
      )}
      <div className={styles.rangeTrackWrap}>
        <div className={styles.rangeTrack}>
          <div
            className={styles.rangeFill}
            style={{ left: `${pctMin}%`, right: `${100 - pctMax}%` }}
          />
        </div>
        <input
          type="range"
          className={styles.rangeInput}
          min={min}
          max={max}
          step={step}
          value={valueMin}
          onChange={(e) => onChangeMin?.(Number(e.target.value))}
          aria-label={`${label ?? 'Range'} mínimo`}
        />
        <input
          type="range"
          className={styles.rangeInput}
          min={min}
          max={max}
          step={step}
          value={valueMax}
          onChange={(e) => onChangeMax?.(Number(e.target.value))}
          aria-label={`${label ?? 'Range'} máximo`}
        />
      </div>
    </div>
  );
}
