import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta = {
  title: 'Foundations/Effects',
  parameters: { layout: 'fullscreen' },
};
export default meta;

// ── shared ───────────────────────────────────────────────────────────────────

const wrap: React.CSSProperties = {
  padding: '40px 48px',
  minHeight: '100vh',
  color: 'var(--color-text-primary)',
  fontFamily: 'var(--font-body)',
  // sem background — deixa os blobs do body::before aparecerem
};

const sectionLabel: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'var(--color-text-tertiary)',
  marginBottom: 24,
};

const divider: React.CSSProperties = {
  borderTop: '1px solid var(--color-border-subtle)',
  margin: '48px 0',
};

const tokenRow = (token: string, role: string) => (
  <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: '1px solid var(--color-border-subtle)' }}>
    <code style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-primary)', minWidth: 260 }}>{token}</code>
    <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>{role}</span>
  </div>
);

// ── Effect 1: Brand ──────────────────────────────────────────────────────────

function BrandDemo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
      {/* botão primário */}
      <button
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '10px 22px', borderRadius: 99, border: 'none',
          background: 'var(--gradient-brand)',
          boxShadow: 'var(--shadow-highlight), var(--shadow-glow-md)',
          color: 'var(--color-gray-white)',
          fontSize: 13, fontWeight: 600, cursor: 'pointer',
          fontFamily: 'var(--font-body)',
          transition: 'filter var(--transition-fast), box-shadow var(--transition-fast)',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.filter = 'brightness(1.08)';
          (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-highlight), var(--shadow-glow-lg)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.filter = '';
          (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-highlight), var(--shadow-glow-md)';
        }}
      >
        Novo usuário
      </button>

      {/* toggle ativo */}
      <div style={{
        width: 44, height: 24, borderRadius: 99,
        background: 'var(--gradient-brand)',
        boxShadow: 'var(--shadow-highlight), var(--shadow-glow-sm)',
        position: 'relative', flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', top: 4, right: 4,
          width: 16, height: 16, borderRadius: '50%',
          background: 'var(--color-gray-white)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
        }} />
      </div>

      {/* pill genérica */}
      <div style={{
        padding: '8px 18px', borderRadius: 8,
        background: 'var(--gradient-brand)',
        boxShadow: 'var(--shadow-highlight), var(--shadow-glow-md)',
        fontSize: 12, fontWeight: 600,
        color: 'var(--color-gray-white)',
        fontFamily: 'var(--font-body)',
      }}>
        Qualquer shape
      </div>
    </div>
  );
}

// ── Effect 2: Glass ──────────────────────────────────────────────────────────

function GlassDemo() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
      {/* botão glass */}
      <button style={{
        display: 'inline-flex', alignItems: 'center',
        padding: '10px 22px', borderRadius: 99, cursor: 'pointer',
        background: 'var(--color-glass-surface)',
        border: '1px solid var(--color-glass-border)',
        backdropFilter: 'blur(var(--blur-glass))',
        WebkitBackdropFilter: 'blur(var(--blur-glass))',
        color: 'var(--color-text-secondary)',
        fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-body)',
        boxShadow: 'var(--shadow-sm)',
      }}>
        ☀ Light mode
      </button>

      {/* card glass */}
      <div style={{
        padding: '20px 24px', borderRadius: 14, minWidth: 220,
        background: 'var(--color-glass-surface)',
        border: '1px solid var(--color-glass-border)',
        backdropFilter: 'blur(var(--blur-glass))',
        WebkitBackdropFilter: 'blur(var(--blur-glass))',
        boxShadow: 'var(--shadow-md)',
      }}>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)' }}>Card glass</p>
        <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--color-text-tertiary)', lineHeight: 1.5 }}>
          Superfície flutuante sobre os blobs.
        </p>
      </div>

    </div>
  );
}

// ── Story ────────────────────────────────────────────────────────────────────

export const Overview: StoryObj = {
  name: 'Overview',
  render: () => (
    <div style={wrap}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase' as const, color: 'var(--color-text-tertiary)', marginBottom: 8 }}>
        Foundations / Effects
      </p>
      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', maxWidth: 560, lineHeight: 1.7, marginBottom: 48 }}>
        Dois "recipes" visuais reutilizáveis via <code style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>var()</code>. Nenhum componente React — só tokens CSS.
      </p>

      {/* ── Brand ── */}
      <p style={sectionLabel}>Efeito 1 — Brand</p>
      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 24, maxWidth: 520 }}>
        Gradiente crimson com glow externo e inset highlight. Reservado para a <strong>ação principal</strong> — botão primário, toggle ativo.
      </p>

      <BrandDemo />

      <div style={{ marginTop: 32 }}>
        {tokenRow('--gradient-brand', 'Gradiente linear 135° — brand-400 → brand-600')}
        {tokenRow('--shadow-highlight', 'Inset highlight branco no topo')}
        {tokenRow('--shadow-glow-sm', 'Glow suave — toggles e elementos pequenos')}
        {tokenRow('--shadow-glow-md', 'Glow médio — botões (default)')}
        {tokenRow('--shadow-glow-lg', 'Glow intenso — estado hover')}
      </div>

      <div style={{ ...divider }} />

      {/* ── Glass ── */}
      <p style={sectionLabel}>Efeito 2 — Glass</p>
      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 24, maxWidth: 520 }}>
        Superfície semi-transparente com <code style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>backdrop-filter: blur()</code>.
        Usado em sidebar, cards, inputs e botões secundários. O efeito depende dos blobs de fundo — nunca use em container com <code style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>overflow: hidden</code>.
      </p>

      <GlassDemo />

      <div style={{ marginTop: 32 }}>
        {tokenRow('--color-glass-surface', 'rgba semi-transparente — dark: 4.5% / light: 75%')}
        {tokenRow('--color-glass-border', 'Borda sutil — separa do fundo')}
        {tokenRow('--blur-glass', 'Valor do backdrop-filter — 14px')}
      </div>

      <div style={{ ...divider }} />

      {/* ── Usage ── */}
      <p style={sectionLabel}>Como usar</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border-subtle)', borderRadius: 10, padding: '20px 24px' }}>
          <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--color-text-tertiary)' }}>Brand</p>
          <pre style={{ margin: 0, fontSize: 11, lineHeight: 1.8, fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)', overflowX: 'auto' as const }}>{`.primary {
  background: var(--gradient-brand);
  box-shadow:
    var(--shadow-highlight),
    var(--shadow-glow-md);
}
.primary:hover {
  filter: brightness(1.08);
  box-shadow:
    var(--shadow-highlight),
    var(--shadow-glow-lg);
}`}</pre>
        </div>
        <div style={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border-subtle)', borderRadius: 10, padding: '20px 24px' }}>
          <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--color-text-tertiary)' }}>Glass</p>
          <pre style={{ margin: 0, fontSize: 11, lineHeight: 1.8, fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)', overflowX: 'auto' as const }}>{`.card {
  background: var(--color-glass-surface);
  border: 1px solid var(--color-glass-border);
  backdrop-filter:
    blur(var(--blur-glass));
  /* nunca: overflow: hidden no pai */
}`}</pre>
        </div>
      </div>
    </div>
  ),
};
