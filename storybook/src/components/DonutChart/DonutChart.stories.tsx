import type { Meta, StoryObj } from '@storybook/react';
import { DonutChart } from './DonutChart';

const meta: Meta<typeof DonutChart> = {
  title: 'Components/DonutChart',
  component: DonutChart,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 380 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof DonutChart>;

export const StatusCarregadores: Story = {
  args: {
    title: 'Status dos carregadores',
    series: [98, 24, 12, 8],
    labels: ['Ativo', 'Inativo', 'Em manutenção', 'Instalando'],
    totalLabel: 'Total',
  },
};

export const DuasCategoria: Story = {
  args: {
    title: 'Tipo de conector',
    series: [65, 35],
    labels: ['CCS2', 'Tipo 2'],
    colors: ['#7c3aed', '#3b82f6'],
  },
};
