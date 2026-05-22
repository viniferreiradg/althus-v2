import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: () => {
    const [on, setOn] = useState(false);
    return <Toggle label={on ? 'Ligado' : 'Desligado'} checked={on} onChange={() => setOn(v => !v)} />;
  },
};

export const NoLabel: Story = {
  render: () => {
    const [on, setOn] = useState(false);
    return <Toggle checked={on} onChange={() => setOn(v => !v)} />;
  },
};

export const Small: Story = {
  render: () => {
    const [on, setOn] = useState(false);
    return <Toggle size="sm" label={on ? 'Ligado' : 'Desligado'} checked={on} onChange={() => setOn(v => !v)} />;
  },
};

export const SmallNoLabel: Story = {
  render: () => {
    const [on, setOn] = useState(false);
    return <Toggle size="sm" checked={on} onChange={() => setOn(v => !v)} />;
  },
};

export const Disabled: Story = {
  args: { label: 'Recurso indisponível', disabled: true, checked: false },
};

export const DisabledChecked: Story = {
  args: { label: 'Sempre ativo', checked: true, disabled: true },
};

export const AllVariants: Story = {
  render: () => {
    const [s, setS] = useState({ a: false, b: true, c: false, d: true });
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>md — com label</div>
        <Toggle label={s.a ? 'Ligado' : 'Desligado'} checked={s.a} onChange={() => setS(p => ({ ...p, a: !p.a }))} />
        <Toggle label="Desabilitado" disabled checked={false} />

        <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>md — sem label</div>
        <Toggle checked={s.b} onChange={() => setS(p => ({ ...p, b: !p.b }))} />
        <Toggle disabled checked={false} />

        <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>sm — com label</div>
        <Toggle size="sm" label={s.c ? 'Ligado' : 'Desligado'} checked={s.c} onChange={() => setS(p => ({ ...p, c: !p.c }))} />
        <Toggle size="sm" label="Desabilitado" disabled checked={false} />

        <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>sm — sem label</div>
        <Toggle size="sm" checked={s.d} onChange={() => setS(p => ({ ...p, d: !p.d }))} />
        <Toggle size="sm" disabled checked={false} />
      </div>
    );
  },
};
