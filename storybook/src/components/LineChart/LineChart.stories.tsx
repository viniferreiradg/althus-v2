import type { Meta, StoryObj } from '@storybook/react';
import { LineChart } from './LineChart';

const meta: Meta<typeof LineChart> = {
  title: 'Components/LineChart',
  component: LineChart,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof LineChart>;

const categories = ['01/05', '05/05', '09/05', '13/05', '17/05', '21/05', '25/05', '29/05'];

export const Recargas: Story = {
  args: {
    title: 'Recargas no período',
    series: [{ name: 'Recargas', data: [42, 58, 45, 73, 61, 88, 94, 77] }],
    categories,
  },
};

export const RecargasEFaturamento: Story = {
  args: {
    title: 'Recargas e Faturamento',
    series: [
      { name: 'Recargas', data: [42, 58, 45, 73, 61, 88, 94, 77] },
      { name: 'Faturamento (R$)', data: [820, 1140, 880, 1430, 1200, 1720, 1840, 1510] },
    ],
    categories,
    yFormatter: (v) => v > 100 ? `R$ ${v.toLocaleString('pt-BR')}` : String(v),
  },
};

export const SemTitulo: Story = {
  args: {
    series: [{ name: 'Sessões', data: [10, 20, 15, 30, 25, 40, 35] }],
    categories: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    height: 200,
  },
};
