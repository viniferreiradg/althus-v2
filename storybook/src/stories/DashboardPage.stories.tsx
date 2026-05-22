import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { UserPlus, Pencil, Trash2, Search } from 'lucide-react';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Button } from '../components/Button/Button';
import { Input } from '../components/Input/Input';
import { Table, type TableColumn } from '../components/Table/Table';

/* ── Mock data ──────────────────────────────────────────────────────────── */

type User = {
  name: string;
  email: string;
  role: string;
  status: string;
  active: boolean;
};

const USERS: User[] = [
  { name: 'Ana Souza',      email: 'ana@althus.com',      role: 'Administrador', status: 'active',   active: true  },
  { name: 'Bruno Lima',     email: 'bruno@althus.com',    role: 'Editor',        status: 'active',   active: true  },
  { name: 'Carla Mendes',   email: 'carla@althus.com',    role: 'Visualizador',  status: 'inactive', active: false },
  { name: 'Diego Torres',   email: 'diego@althus.com',    role: 'Editor',        status: 'active',   active: true  },
  { name: 'Elena Rocha',    email: 'elena@althus.com',    role: 'Administrador', status: 'inactive', active: false },
  { name: 'Felipe Castro',  email: 'felipe@althus.com',   role: 'Visualizador',  status: 'active',   active: true  },
];

const STATUS_MAP = {
  active:   { label: 'Ativo',   status: 'success' as const },
  inactive: { label: 'Inativo', status: 'error'   as const },
};

const COLUMNS: TableColumn<Record<string, unknown>>[] = [
  { key: 'name',   label: 'Nome',    sortable: true },
  { key: 'email',  label: 'E-mail',  sortable: true },
  { key: 'role',   label: 'Perfil' },
  { key: 'status', label: 'Status',  type: 'badge', statusMap: STATUS_MAP },
  { key: 'active', label: 'Acesso',  type: 'toggle' },
  {
    key: 'name',
    label: '',
    type: 'actions',
    width: 80,
    actionItems: [
      { icon: <Pencil size={14} />, label: 'Editar',  onClick: () => {} },
      { icon: <Trash2 size={14} />, label: 'Remover', onClick: () => {}, danger: true },
    ],
  },
];

/* ── Page component ─────────────────────────────────────────────────────── */

function DashboardUsersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeItem, setActiveItem]   = useState('usuarios');
  const [search, setSearch]           = useState('');

  const rows = USERS
    .filter(u => u.name.toLowerCase().includes(search.toLowerCase()) ||
                 u.email.toLowerCase().includes(search.toLowerCase()))
    .map(u => u as unknown as Record<string, unknown>);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>

      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(o => !o)}
        activeItem={activeItem}
        onNavClick={setActiveItem}
      />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Page header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '24px 32px 0',
          flexShrink: 0,
        }}>
          <div>
            <h1 style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontSize: 24, fontWeight: 600,
              color: 'var(--color-text-primary)',
            }}>
              Usuários
            </h1>
            <p style={{
              margin: '4px 0 0',
              fontSize: 14,
              color: 'var(--color-text-tertiary)',
              fontFamily: 'var(--font-body)',
            }}>
              {USERS.length} usuários cadastrados
            </p>
          </div>

          <Button iconLeft={<UserPlus size={16} />}>
            Novo usuário
          </Button>
        </div>

        {/* Toolbar */}
        <div style={{ padding: '20px 32px 0', flexShrink: 0 }}>
          <Input
            placeholder="Buscar por nome ou e-mail..."
            iconLeft={<Search size={16} />}
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ maxWidth: 320 }}
          />
        </div>

        {/* Table */}
        <div style={{ flex: 1, overflow: 'auto', padding: '16px 32px 32px' }}>
          <Table
            columns={COLUMNS}
            rows={rows}
            emptyMessage="Nenhum usuário encontrado."
          />
        </div>

      </main>
    </div>
  );
}

/* ── Story ──────────────────────────────────────────────────────────────── */

const meta: Meta = {
  title: 'Pages/Dashboard — Usuários',
  component: DashboardUsersPage,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj;
export const Default: Story = { render: () => <DashboardUsersPage /> };
