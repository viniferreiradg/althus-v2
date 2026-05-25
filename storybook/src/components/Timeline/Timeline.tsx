import styles from './Timeline.module.css';

// ── Types ────────────────────────────────────────────────────────────────────

export type TimelineStatus = 'done' | 'active' | 'pending';

export interface TimelineItem {
  label: string;
  /** Timestamp ou texto de data/hora — exibido abaixo do label */
  time?: string;
  status: TimelineStatus;
}

export interface TimelineProps {
  items: TimelineItem[];
}

// ── Componente ────────────────────────────────────────────────────────────────

const statusClass: Record<TimelineStatus, string> = {
  done:    styles.tlDone,
  active:  styles.tlActive,
  pending: styles.tlPending,
};

export function Timeline({ items }: TimelineProps) {
  return (
    <div className={styles.timeline}>
      {items.map((item, i) => (
        <div key={i} className={`${styles.tlItem} ${statusClass[item.status]}`}>
          <div className={styles.tlVis}>
            <div className={styles.tlDot} />
            <div className={styles.tlConnector} />
          </div>
          <div className={styles.tlContent}>
            <div className={styles.tlLabel}>{item.label}</div>
            {item.time && <div className={styles.tlTime}>{item.time}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
