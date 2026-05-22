import type { Meta, StoryObj } from '@storybook/react';
import { Zap, RotateCcw, CircleDollarSign, Wifi } from 'lucide-react';
import { MetricCard } from './MetricCard';

const meta: Meta<typeof MetricCard> = {
  title: 'Components/MetricCard',
  component: MetricCard,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 280 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof MetricCard>;

export const Carregadores: Story = {
  args: {
    icon: Zap,
    label: 'Total de carregadores habilitados',
    value: '142',
    trend: { value: '+8', direction: 'up' },
  },
};

export const Recargas: Story = {
  args: {
    icon: RotateCcw,
    label: 'Recargas no período',
    value: '1.847',
    trend: { value: '+12%', direction: 'up' },
  },
};

export const Faturamento: Story = {
  args: {
    icon: CircleDollarSign,
    label: 'Faturamento total',
    value: 'R$ 28.430',
    trend: { value: '-3%', direction: 'down' },
  },
};

export const SemVariacao: Story = {
  args: {
    icon: Wifi,
    label: 'Carregadores online agora',
    value: '98',
  },
};

export const Grid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 900 }}>
      <MetricCard
        icon={Zap}
        label="Total de carregadores habilitados"
        value="142"
        trend={{ value: '+8', direction: 'up' }}
      />
      <MetricCard
        icon={RotateCcw}
        label="Recargas no período"
        value="1.847"
        trend={{ value: '+12%', direction: 'up' }}
      />
      <MetricCard
        icon={CircleDollarSign}
        label="Faturamento total"
        value="R$ 28.430"
        trend={{ value: '-3%', direction: 'down' }}
      />
    </div>
  ),
};
