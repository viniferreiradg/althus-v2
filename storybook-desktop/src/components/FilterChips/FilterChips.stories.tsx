import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { FilterChips } from './FilterChips';

const meta: Meta<typeof FilterChips> = {
  title: 'Components/FilterChips',
  component: FilterChips,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof FilterChips>;

const periodOptions = [
  { label: '7 dias',  value: '7'  },
  { label: '15 dias', value: '15' },
  { label: '30 dias', value: '30' },
];

const statusOptions = [
  { label: 'Todos',             value: 'todos'    },
  { label: 'Com saldo',         value: 'saldo'    },
  { label: 'Saque solicitado',  value: 'saque'    },
  { label: 'Abaixo do mínimo',  value: 'abaixo'   },
];

const periodOptionsWithIcon = [
  { label: '30 dias', value: '30' },
  { label: '60 dias', value: '60' },
  { label: '90 dias', value: '90' },
  { label: 'Período', value: 'custom', icon: <Calendar size={12} /> },
];

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState('7');
    return <FilterChips options={periodOptions} activeValue={active} onChange={setActive} />;
  },
};

export const StatusFilter: Story = {
  render: () => {
    const [active, setActive] = useState('todos');
    return <FilterChips options={statusOptions} activeValue={active} onChange={setActive} />;
  },
};

export const WithIcon: Story = {
  render: () => {
    const [active, setActive] = useState('30');
    return <FilterChips options={periodOptionsWithIcon} activeValue={active} onChange={setActive} />;
  },
};
