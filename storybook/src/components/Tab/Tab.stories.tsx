import type { Meta, StoryObj } from '@storybook/react';
import { Tab } from './Tab';

const meta: Meta<typeof Tab> = {
  title: 'Components/Tab',
  component: Tab,
  tags: ['autodocs'],
  decorators: [(S) => <div style={{ maxWidth: 640, padding: '24px' }}><S /></div>],
};
export default meta;
type Story = StoryObj<typeof Tab>;

export const Default: Story = {
  name: 'Duas abas',
  args: {
    tabs: [
      {
        label: 'Opções de tarifas',
        content: <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
          Configurações de tarifa de recarga, taxa de ociosidade e taxa de reserva.
        </p>,
      },
      {
        label: 'Tarifas personalizadas',
        content: <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
          Regras de cobrança específicas por carregador, sobrepostas à tarifa padrão.
        </p>,
      },
    ],
  },
};

export const SecondTabActive: Story = {
  name: 'Segunda aba ativa',
  args: {
    tabs: [
      {
        label: 'Opções de tarifas',
        content: <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
          Configurações de tarifa de recarga, taxa de ociosidade e taxa de reserva.
        </p>,
      },
      {
        label: 'Tarifas personalizadas',
        content: <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
          Regras de cobrança específicas por carregador, sobrepostas à tarifa padrão.
        </p>,
      },
    ],
    defaultIndex: 1,
  },
};

export const ManyTabs: Story = {
  name: 'Muitas abas',
  args: {
    tabs: [
      { label: 'Visão geral',     content: <p>Visão geral</p> },
      { label: 'Configurações',   content: <p>Configurações</p> },
      { label: 'Histórico',       content: <p>Histórico</p> },
      { label: 'Relatórios',      content: <p>Relatórios</p> },
      { label: 'Integrações',     content: <p>Integrações</p> },
    ],
  },
};
