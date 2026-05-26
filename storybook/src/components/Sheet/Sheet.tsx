import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './Sheet.module.css';

export type SheetProps = {
  /** Controla visibilidade */
  open: boolean;
  /** Callback ao fechar (botão X ou clique no overlay) */
  onClose: () => void;
  /** Título do header */
  title: string;
  /** Conteúdo principal (scrollável) */
  children: ReactNode;
  /** Ações no rodapé (opcional) */
  footer?: ReactNode;
  /** Largura do painel. Default: 400px */
  width?: number | string;
};

export function Sheet({
  open,
  onClose,
  title,
  children,
  footer,
  width = 400,
}: SheetProps) {
  /* Bloqueia scroll do body quando aberto */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  /* Fecha com Escape */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  return (
    <div
      className={[styles.sheetOverlay, open ? styles.sheetOpen : ''].join(' ')}
      onClick={onClose}
      aria-hidden={!open}
    >
      <aside
        className={styles.sheetPanel}
        style={{ width }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className={styles.sheetHeader}>
          <span className={styles.sheetTitle}>{title}</span>
          <button
            className={styles.sheetClose}
            onClick={onClose}
            aria-label="Fechar"
            type="button"
          >
            <X size={16} />
          </button>
        </div>

        <div className={styles.sheetBody}>
          {children}
        </div>

        {footer && (
          <div className={styles.sheetFooter}>
            {footer}
          </div>
        )}
      </aside>
    </div>
  );
}
