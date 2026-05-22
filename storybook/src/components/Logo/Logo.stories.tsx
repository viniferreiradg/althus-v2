import type { Meta, StoryObj } from '@storybook/react';
import { Logo, LogoSymbol } from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    width: { control: 'number' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A marca Althus em SVG. A cor herda automaticamente `--color-text-primary`, ' +
          'adaptando-se ao tema light e dark sem nenhuma prop adicional.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: { size: 'md' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', alignItems: 'flex-start' }}>
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
          <Logo size={size} />
          <span style={{ color: 'var(--color-text-secondary)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>
            {size} — {size === 'sm' ? 80 : size === 'md' ? 160 : size === 'lg' ? 240 : 360}px
          </span>
        </div>
      ))}
    </div>
  ),
};

export const OnColoredBackground: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
      <div
        style={{
          background: 'var(--color-bg-default)',
          padding: 'var(--spacing-lg)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border-subtle)',
        }}
      >
        <Logo size="lg" />
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 12, marginTop: 8, fontFamily: 'var(--font-mono)' }}>
          bg-default → text-primary
        </p>
      </div>

      <div
        style={{
          background: 'var(--color-bg-subtle)',
          padding: 'var(--spacing-lg)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border-subtle)',
        }}
      >
        <Logo size="lg" />
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 12, marginTop: 8, fontFamily: 'var(--font-mono)' }}>
          bg-subtle → text-primary
        </p>
      </div>

      <div
        style={{
          background: 'var(--color-brand-500)',
          padding: 'var(--spacing-lg)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <Logo size="lg" style={{ color: '#fff' }} />
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 8, fontFamily: 'var(--font-mono)' }}>
          brand-500 → color #fff (override manual)
        </p>
      </div>
    </div>
  ),
};

export const CustomColor: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)', alignItems: 'flex-start' }}>
      <Logo size="md" style={{ color: 'var(--color-text-primary)' }} />
      <Logo size="md" style={{ color: 'var(--color-brand-500)' }} />
      <Logo size="md" style={{ color: 'var(--color-text-secondary)' }} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A cor pode ser sobrescrita via `style={{ color: "..." }}`. ' +
          'Por padrão usa `--color-text-primary`.',
      },
    },
  },
};

export const Symbol: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', alignItems: 'flex-start' }}>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: 13, fontFamily: 'var(--font-body)' }}>
        Versão símbolo — usada quando o espaço horizontal é reduzido (ex: sidebar minimizada).
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xl)', flexWrap: 'wrap' }}>
        {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
          <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <LogoSymbol size={size} />
            <span style={{ color: 'var(--color-text-tertiary)', fontSize: 11, fontFamily: 'var(--font-mono)' }}>
              {size} — {size === 'sm' ? 24 : size === 'md' ? 32 : size === 'lg' ? 48 : 64}px
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginTop: 8 }}>
        <div style={{ background: 'var(--color-bg-default)', padding: 16, borderRadius: 8, border: '1px solid var(--color-border-subtle)' }}>
          <LogoSymbol size="md" />
        </div>
        <div style={{ background: 'var(--color-brand-500)', padding: 16, borderRadius: 8 }}>
          <LogoSymbol size="md" style={{ color: '#fff' }} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Símbolo quadrado da marca — usado na sidebar minimizada e contextos de espaço reduzido.',
      },
    },
  },
};

export const DoNotUse: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: 13, marginBottom: 4 }}>
        Evite usar a logo com baixo contraste ou sobre fundos saturados sem ajuste de cor.
      </p>
      <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              background: '#444',
              padding: 'var(--spacing-md)',
              borderRadius: 'var(--radius-sm)',
              opacity: 0.4,
            }}
          >
            <Logo size="sm" style={{ color: '#666' }} />
          </div>
          <p style={{ color: 'var(--color-text-error)', fontSize: 11, marginTop: 4, fontFamily: 'var(--font-mono)' }}>
            baixo contraste
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              background: 'var(--color-bg-default)',
              padding: 'var(--spacing-md)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <Logo size="sm" style={{ color: 'var(--color-text-primary)', transform: 'scaleX(-1)' }} />
          </div>
          <p style={{ color: 'var(--color-text-error)', fontSize: 11, marginTop: 4, fontFamily: 'var(--font-mono)' }}>
            espelhada
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Exemplos do que NÃO fazer com a logo.',
      },
    },
  },
};
