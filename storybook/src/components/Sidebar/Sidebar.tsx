import { ReactNode } from 'react';
import {
  LayoutDashboard,
  CalendarCheck,
  User,
  ContactRound,
  Building2,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
} from 'lucide-react';
import styles from './Sidebar.module.css';
import { Logo, LogoSymbol } from '../Logo/Logo';
import { Avatar } from '../Avatar/Avatar';

/* ── Types ─────────────────────────────────────────────────────────────── */

export type NavItemDef = {
  id: string;
  label: string;
  icon: ReactNode;
  /** Mostra ponto de notificação (círculo brand) */
  dot?: boolean;
  /** Mostra chevron de sub-menu */
  hasDropdown?: boolean;
};

export type SidebarUser = {
  name: string;
  email: string;
  /** Iniciais exibidas no avatar (máx 2 chars) */
  initials: string;
};

export type SidebarProps = {
  open?: boolean;
  onToggle?: () => void;
  activeItem?: string;
  onNavClick?: (id: string) => void;
  user?: SidebarUser;
  onLogout?: () => void;
  /** Filtra itens exclusivos do adm quando 'empresa' */
  role?: 'adm' | 'empresa';
  theme?: 'dark' | 'light';
  onThemeToggle?: () => void;
};

/** Itens visíveis apenas para administradores */
const ADM_ONLY_IDS = new Set(['usuarios', 'profissionais', 'clientes']);

/* ── Default nav items — mapeados do Figma ──────────────────────────────── */

export const defaultNavItems: NavItemDef[] = [
  { id: 'dashboard',     label: 'Dashboard',     icon: <LayoutDashboard size={20} /> },
  { id: 'eventos',       label: 'Eventos',        icon: <CalendarCheck   size={20} />, dot: true },
  { id: 'usuarios',      label: 'Usuários',       icon: <User            size={20} /> },
  { id: 'profissionais', label: 'Profissionais',  icon: <ContactRound    size={20} /> },
  { id: 'clientes',      label: 'Clientes',       icon: <Building2       size={20} /> },
  { id: 'pesquisa',      label: 'Pesquisa',       icon: <FileText        size={20} /> },
];

const defaultUser: SidebarUser = {
  name: 'Admin Althus',
  email: 'admin@althus.com',
  initials: 'AA',
};

/* ── Sidebar ────────────────────────────────────────────────────────────── */

export function Sidebar({
  open = true,
  onToggle,
  activeItem = 'dashboard',
  onNavClick,
  user = defaultUser,
  onLogout,
  role = 'adm',
  theme = 'dark',
  onThemeToggle,
}: SidebarProps) {
  const navItems = role === 'empresa'
    ? defaultNavItems.filter(item => !ADM_ONLY_IDS.has(item.id))
    : defaultNavItems;

  return (
    <aside className={[styles.sidebar, open ? styles.open : styles.closed].join(' ')}>

      {/* ── Logo + Toggle (alinhados na mesma altura) ────────────────── */}
      <div className={styles.logoRow}>
        <div className={styles.logoWrap}>
          {open ? <Logo width={100} /> : <LogoSymbol size="md" />}
        </div>
        <button
          className={styles.toggleBtn}
          onClick={onToggle}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          type="button"
        >
          {open ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>

      {/* ── Nav + bottom (gap 404 em Figma = flex:1 spacer) ──────────── */}
      <div className={styles.body}>

        {/* Nav List principal */}
        <nav className={styles.navList}>
          {navItems.map(item => {
            const isActive = item.id === activeItem;
            return (
              <button
                key={item.id}
                className={[styles.navItem, isActive ? styles.navItemActive : ''].join(' ')}
                onClick={() => onNavClick?.(item.id)}
                title={!open ? item.label : undefined}
                aria-current={isActive ? 'page' : undefined}
                type="button"
              >
                <span className={styles.navIcon}>{item.icon}</span>
                {open && (
                  <>
                    <span className={styles.navLabel}>{item.label}</span>
                    {item.dot && (
                      <span className={styles.navTrail}>
                        <span className={styles.dot} />
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* Spacer — empurra a seção de baixo para o fundo */}
        <div className={styles.spacer} />

        {/* Bottom — separador + usuário + sair */}
        <div className={styles.bottomList}>
          <div className={styles.separator} />

          {/* Avatar + nome/email */}
          <div className={styles.userRow}>
            <Avatar initials={user.initials} size="md" />
            {open && (
              <div className={styles.userInfo}>
                <span className={styles.userName}>{user.name}</span>
                <span className={styles.userEmail}>{user.email}</span>
              </div>
            )}
          </div>

          {/* Tema */}
          <button
            className={styles.navItem}
            onClick={onThemeToggle}
            title={!open ? (theme === 'dark' ? 'Modo claro' : 'Modo escuro') : undefined}
            type="button"
          >
            <span className={styles.navIcon}>
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </span>
            {open && (
              <span className={styles.navLabel}>
                {theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
              </span>
            )}
          </button>

          {/* Sair */}
          <button
            className={styles.navItem}
            onClick={onLogout}
            title={!open ? 'Sair' : undefined}
            type="button"
          >
            <span className={styles.navIcon}><LogOut size={20} /></span>
            {open && <span className={styles.navLabelLogout}>Sair</span>}
          </button>
        </div>
      </div>


    </aside>
  );
}
