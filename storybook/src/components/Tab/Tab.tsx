import { ReactNode, useState } from 'react';
import styles from './Tab.module.css';

export interface TabItem { label: string; content: ReactNode; }

export interface TabProps {
  tabs: TabItem[];
  defaultIndex?: number;
  onChange?: (index: number) => void;
}

function getPositionClass(i: number, total: number, s: typeof styles): string {
  if (i === 0) return s.tabLeft;
  if (i === total - 1) return s.tabRight;
  return s.tabMiddle;
}

export function Tab({ tabs, defaultIndex = 0, onChange }: TabProps) {
  const [active, setActive] = useState(defaultIndex);

  const select = (i: number) => { setActive(i); onChange?.(i); };

  return (
    <div className={styles.tabWrapper}>
      <div className={styles.tabList} role="tablist">
        {tabs.map((tab, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={active === i}
            aria-controls={`tabpanel-${i}`}
            className={[
              styles.tabBtn,
              active === i ? styles.tabBtnActive : '',
              getPositionClass(i, tabs.length, styles),
            ].filter(Boolean).join(' ')}
            onClick={() => select(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div id={`tabpanel-${active}`} role="tabpanel" className={styles.tabPanel}>
        {tabs[active]?.content}
      </div>
    </div>
  );
}
