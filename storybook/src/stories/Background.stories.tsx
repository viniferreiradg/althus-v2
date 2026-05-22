import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta = {
  title: 'Foundations/Background',
  parameters: { layout: 'fullscreen' },
};
export default meta;

const tokens = [
  { prop: 'Base background',  token: '--color-bg-default',    role: 'Cor sólida de fundo' },
  { prop: 'Surface (card)',   token: '--color-bg-surface',     role: 'Cards e painéis' },
  { prop: 'Elevated',        token: '--color-bg-elevated',    role: 'Superfície elevada' },
  { prop: 'Blob primário',   token: '--color-blob-1',         role: 'Gradiente radial 1' },
  { prop: 'Blob secundário', token: '--color-blob-2',         role: 'Gradiente radial 2' },
  { prop: 'Glass surface',   token: '--color-glass-surface',  role: 'Background de card glass' },
  { prop: 'Glass border',    token: '--color-glass-border',   role: 'Borda de card glass' },
  { prop: 'Backdrop blur',   token: '--blur-glass',           role: 'backdrop-filter blur' },
];

function BlobPreview({ theme }: { theme: 'dark' | 'light' }) {
  return (
    <div data-theme={theme} style={{
      position: 'relative',
      borderRadius: 16,
      overflow: 'hidden',
      height: 260,
      background: 'var(--color-bg-default)',
    }}>
      <div style={{
        position: 'absolute', width: 340, height: 340, borderRadius: '50%',
        background: 'radial-gradient(circle, var(--color-blob-1), transparent 68%)',
        top: -100, left: -80, filter: 'blur(14px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', width: 220, height: 220, borderRadius: '50%',
        background: 'radial-gradient(circle, var(--color-blob-2), transparent 68%)',
        bottom: -50, right: -30, filter: 'blur(10px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 20,
        background: 'var(--color-glass-surface)',
        border: '1px solid var(--color-glass-border)',
        borderRadius: 12,
        backdropFilter: 'blur(var(--blur-glass))',
        WebkitBackdropFilter: 'blur(var(--blur-glass))',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        boxShadow: 'var(--shadow-md)',
      }}>
        <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
          Glass surface
        </p>
        <p style={{ margin: 0, fontSize: 11, color: 'var(--color-text-tertiary)', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 10, background: 'var(--color-bg-elevated)', padding: '1px 4px', borderRadius: 3 }}>
            backdrop-filter: blur(var(--blur-glass))
          </code>
          {' '}— funciona porque os blobs existem atrás.
        </p>
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <button style={{
            flex: 1, padding: '8px 0', borderRadius: 7, border: 'none',
            background: 'linear-gradient(135deg, var(--color-brand-400), var(--color-brand-500))',
            color: 'var(--color-gray-white)',
            fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-body)',
            boxShadow: 'var(--shadow-sm)',
          }}>Salvar</button>
          <button style={{
            flex: 1, padding: '8px 0', borderRadius: 7,
            border: '1px solid var(--color-glass-border)',
            background: 'var(--color-glass-surface)',
            color: 'var(--color-text-secondary)',
            fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)',
          }}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export const Overview: StoryObj = {
  name: 'Overview',
  render: () => (
    <div style={{
      padding: '40px 48px',
      minHeight: '100vh',
      background: 'var(--color-bg-default)',
      color: 'var(--color-text-primary)',
      fontFamily: 'var(--font-body)',
    }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase' as const, color: 'var(--color-text-tertiary)', marginBottom: 8 }}>
        Foundations / Background
      </p>
      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', maxWidth: 560, lineHeight: 1.7, marginBottom: 40 }}>
        Três camadas sobrepostas: <strong>base sólida</strong> (<code style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>--color-bg-default</code>),
        {' '}<strong>blobs radiais</strong> (<code style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>--color-blob-1/2</code>) e
        {' '}<strong>superfícies glass</strong> (<code style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>--color-glass-surface</code> + <code style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>--blur-glass</code>).
      </p>

      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase' as const, color: 'var(--color-text-tertiary)', marginBottom: 16 }}>
        Dark vs Light
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 48 }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-tertiary)', marginBottom: 8 }}>Dark</p>
          <BlobPreview theme="dark" />
        </div>
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-tertiary)', marginBottom: 8 }}>Light</p>
          <BlobPreview theme="light" />
        </div>
      </div>

      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase' as const, color: 'var(--color-text-tertiary)', marginBottom: 16 }}>
        Tokens
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead>
          <tr>
            {['Propriedade', 'Token CSS', 'Função'].map(h => (
              <th key={h} style={{ textAlign: 'left', padding: '6px 12px', fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--color-text-tertiary)', borderBottom: '1px solid var(--color-border-subtle)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tokens.map(t => (
            <tr key={t.token}>
              <td style={{ padding: '10px 12px', color: 'var(--color-text-secondary)', fontWeight: 600, borderBottom: '1px solid var(--color-border-subtle)' }}>{t.prop}</td>
              <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-primary)', borderBottom: '1px solid var(--color-border-subtle)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 14, height: 14, borderRadius: 3, background: `var(${t.token})`, border: '1px solid var(--color-border-subtle)', flexShrink: 0 }} />
                  {t.token}
                </span>
              </td>
              <td style={{ padding: '10px 12px', color: 'var(--color-text-tertiary)', borderBottom: '1px solid var(--color-border-subtle)' }}>{t.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};
