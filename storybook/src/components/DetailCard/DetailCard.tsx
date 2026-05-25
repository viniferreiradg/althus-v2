import React, { ReactNode } from 'react';
import styles from './DetailCard.module.css';

// ── Types ────────────────────────────────────────────────────────────────────

export interface InfoItem {
  label: string;
  /** Conteúdo da célula de valor — string, badge, número, etc. */
  value: ReactNode;
  /** Variante visual do valor */
  variant?: 'default' | 'mono' | 'dim' | 'strong';
}

export interface DetailCardProps {
  title: string;
  items: InfoItem[];
  /** Ocupa as 2 colunas do grid quando true */
  full?: boolean;
  /** Conteúdo extra abaixo do infoGrid (ex: barra de progresso) */
  children?: ReactNode;
}

export interface DetailGridProps {
  children: ReactNode;
}

export interface TitleRowProps {
  title: string;
  /** Badge de status ao lado do título */
  badge?: ReactNode;
}

// ── Componentes ───────────────────────────────────────────────────────────────

/** Linha de cabeçalho da página: título h1 + badge de status opcional */
export function TitleRow({ title, badge }: TitleRowProps) {
  return (
    <div className={styles.titleRow}>
      <h1 style={{
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--font-size-xl)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-text-primary)',
        lineHeight: 'var(--line-height-tight)',
      }}>
        {title}
      </h1>
      {badge}
    </div>
  );
}

/** Grid externo de 2 colunas que contém os DetailCards */
export function DetailGrid({ children }: DetailGridProps) {
  return <div className={styles.detailGrid}>{children}</div>;
}

/** Card individual com título e grid de pares chave–valor */
export function DetailCard({ title, items, full = false, children }: DetailCardProps) {
  return (
    <div className={`card ${full ? styles.detailCardFull : styles.detailCard}`}>
      <h2 className={styles.cardTitle}>{title}</h2>
      <div className={styles.infoGrid}>
        {items.map((item, i) => {
          const valueClass =
            item.variant === 'mono'   ? styles.infoValueMono   :
            item.variant === 'dim'    ? styles.infoValueDim    :
            item.variant === 'strong' ? styles.infoValueStrong :
                                        styles.infoValue;
          return (
            <React.Fragment key={i}>
              <span className={styles.infoLabel}>{item.label}</span>
              <span className={valueClass}>{item.value}</span>
            </React.Fragment>
          );
        })}
      </div>
      {children}
    </div>
  );
}
