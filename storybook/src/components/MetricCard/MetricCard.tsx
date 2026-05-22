import { TrendingUp, TrendingDown, Minus, type LucideIcon } from 'lucide-react';
import styles from './MetricCard.module.css';

export interface MetricCardTrend {
  value: string;
  direction: 'up' | 'down' | 'neutral';
}

export interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: MetricCardTrend;
}

export function MetricCard({ icon: Icon, label, value, trend }: MetricCardProps) {
  const TrendIcon =
    trend?.direction === 'up' ? TrendingUp :
    trend?.direction === 'down' ? TrendingDown : Minus;

  return (
    <div className={styles.root}>
      <div className={styles.iconWrap}>
        <Icon size={18} />
      </div>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
      {trend && (
        <div className={`${styles.trend} ${styles[trend.direction]}`}>
          <TrendIcon size={13} />
          <span>{trend.value} vs. período anterior</span>
        </div>
      )}
    </div>
  );
}
