import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Background } from './Background';

const meta: Meta<typeof Background> = {
  title: 'Components/Background',
  component: Background,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof Background>;

export const Default: Story = {
  render: () => (
    <Background style={{ height: '100vh', background: 'var(--color-bg-default)' } as React.CSSProperties}>
      <div style={{
        position: 'relative',
        zIndex: 1,
        padding: 48,
        color: 'var(--color-text-primary)',
        fontFamily: 'var(--font-body)',
      }}>
        <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
          Componente Background — blobs decorativos posicionados via CSS Module.
        </p>
        <p style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)' }}>
          Adicione <code>position: relative; z-index: 1</code> ao conteúdo para sobrepor os blobs.
        </p>
      </div>
    </Background>
  ),
};

export const DarkAndLight: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '100vh' }}>
      <Background data-theme="dark" style={{ background: 'var(--color-bg-default)' } as React.CSSProperties}>
        <p style={{ position: 'relative', zIndex: 1, padding: 24, color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', fontSize: 12 }}>Dark</p>
      </Background>
      <Background data-theme="light" style={{ background: 'var(--color-bg-default)' } as React.CSSProperties}>
        <p style={{ position: 'relative', zIndex: 1, padding: 24, color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', fontSize: 12 }}>Light</p>
      </Background>
    </div>
  ),
};
