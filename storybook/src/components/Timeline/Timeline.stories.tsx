import type { Meta, StoryObj } from '@storybook/react';
import { Timeline } from './Timeline';

const meta: Meta<typeof Timeline> = {
  title: 'Components/Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'dark' },
  },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

// ── Reserva (done / done / active / pending) ──────────────────────────────────
export const Reserva: Story = {
  args: {
    items: [
      { status: 'done',    label: 'Reserva confirmada pelo usuário',  time: '25/05/2026 às 09:30' },
      { status: 'done',    label: 'Notificação enviada (1 hora antes)', time: '25/05/2026 às 15:45' },
      { status: 'active',  label: 'Janela de reserva iniciada',        time: '25/05/2026 às 16:45' },
      { status: 'pending', label: 'Expiração da janela',               time: 'Previsto para 25/05/2026 às 17:00' },
    ],
  },
};

// ── Todos concluídos ──────────────────────────────────────────────────────────
export const TodosConcluidos: Story = {
  name: 'Todos concluídos',
  args: {
    items: [
      { status: 'done', label: 'Pedido criado',     time: '10/05/2026 às 08:00' },
      { status: 'done', label: 'Pagamento aprovado', time: '10/05/2026 às 08:01' },
      { status: 'done', label: 'Instalação concluída', time: '12/05/2026 às 14:30' },
    ],
  },
};

// ── Apenas pendentes ──────────────────────────────────────────────────────────
export const ApenasPendentes: Story = {
  name: 'Apenas pendentes',
  args: {
    items: [
      { status: 'pending', label: 'Aguardando aprovação' },
      { status: 'pending', label: 'Vistoria técnica' },
      { status: 'pending', label: 'Ativação do dispositivo' },
    ],
  },
};

// ── Sem timestamps ────────────────────────────────────────────────────────────
export const SemTimestamps: Story = {
  name: 'Sem timestamps',
  args: {
    items: [
      { status: 'done',    label: 'Cadastro enviado' },
      { status: 'done',    label: 'Documentos verificados' },
      { status: 'active',  label: 'Análise em andamento' },
      { status: 'pending', label: 'Aprovação final' },
    ],
  },
};
