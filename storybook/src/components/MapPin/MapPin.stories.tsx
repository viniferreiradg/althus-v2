import type { Meta, StoryObj } from '@storybook/react';
import { MapPin } from './MapPin';

const meta: Meta<typeof MapPin> = {
  title: 'Mobile/MapPin',
  component: MapPin,
  parameters: { layout: 'centered', backgrounds: { default: 'dark' } },
  tags: ['autodocs'],
  argTypes: {
    size:     { control: 'select', options: ['sm', 'md', 'lg'] },
    variant:  { control: 'select', options: ['brand', 'muted', 'distributor'] },
    pinColor: { control: 'color' },
    selected: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof MapPin>;

export const Default: Story = {
  args: { size: 'md', variant: 'brand', 'aria-label': 'Carregador disponível' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
      <MapPin size="sm" variant="brand" aria-label="sm" />
      <MapPin size="md" variant="brand" aria-label="md" />
      <MapPin size="lg" variant="brand" aria-label="lg" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <MapPin size="lg" variant="brand" aria-label="Althus — disponível" />
        <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>brand</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <MapPin size="lg" variant="muted" aria-label="Indisponível" />
        <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>muted</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <MapPin size="lg" variant="distributor" pinColor="#E63946" aria-label="TUPI" />
        <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>distributor</span>
      </div>
    </div>
  ),
};

export const Pressed: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 48, alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <MapPin size="lg" variant="brand" aria-label="normal" />
        <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>normal</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <MapPin size="lg" variant="brand" pressed aria-label="pressed" />
        <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>pressed</span>
      </div>
    </div>
  ),
};

export const Selected: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 48, alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <MapPin size="lg" variant="brand" aria-label="Althus — normal" />
        <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>normal</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <MapPin size="lg" variant="brand" selected aria-label="Althus — selecionado" />
        <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>selected</span>
      </div>
    </div>
  ),
};
