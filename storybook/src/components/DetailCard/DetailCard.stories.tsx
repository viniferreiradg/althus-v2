import type { Meta, StoryObj } from '@storybook/react';
import { DetailGrid, DetailCard, TitleRow } from './DetailCard';

const meta: Meta = {
  title: 'Components/DetailCard',
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'dark' },
  },
};

export default meta;

// ── Helper: badge simples inline para os exemplos ────────────────────────────
const Badge = ({ label, status }: { label: string; status: string }) => (
  <span className="badge" data-status={status}>
    <span className="badgeDot" />
    {label}
  </span>
);

// ── Story: Cupom ─────────────────────────────────────────────────────────────
export const Cupom: StoryObj = {
  render: () => (
    <div style={{ maxWidth: 860 }}>
      <TitleRow title="PLT-BEMVINDO" badge={<Badge label="Ativo" status="success" />} />
      <div style={{ marginTop: 'var(--spacing-md)' }}>
        <DetailGrid>
          <DetailCard
            title="Identificação"
            items={[
              { label: 'Código',        value: 'PLT-BEMVINDO', variant: 'mono' },
              { label: 'Tipo',          value: <Badge label="Percentual" status="violet" /> },
              { label: 'Desconto',      value: '15%' },
              { label: 'Limite máximo', value: 'R$ 20,00' },
              { label: 'Aplicação',     value: 'Por código' },
            ]}
          />
          <DetailCard
            title="Vigência e limites"
            items={[
              { label: 'Data de início',   value: '01/01/2026' },
              { label: 'Data de validade', value: '31/12/2026' },
              { label: 'Qtd. máxima',     value: '1.000 usos' },
              { label: 'Limite por CPF',  value: '1 uso' },
            ]}
          />
          <DetailCard
            title="Público-alvo"
            full
            items={[
              { label: 'Localidade',      value: 'Qualquer localidade' },
              { label: 'Raio GPS',        value: '—', variant: 'dim' },
              { label: 'Carregador',      value: 'Qualquer carregador' },
              { label: 'Usuários ativos', value: '—', variant: 'dim' },
              { label: 'Primeira recarga', value: 'Não' },
            ]}
          />
        </DetailGrid>
      </div>
    </div>
  ),
};

// ── Story: Dispositivo ───────────────────────────────────────────────────────
export const Dispositivo: StoryObj = {
  render: () => (
    <div style={{ maxWidth: 860 }}>
      <TitleRow title="ALT-001" badge={<Badge label="Ativo" status="success" />} />
      <div style={{ marginTop: 'var(--spacing-md)' }}>
        <DetailGrid>
          <DetailCard
            title="Informações do dispositivo"
            items={[
              { label: 'Localidade', value: 'Shopping Iguatemi SP' },
              { label: 'Marca',      value: 'ABB' },
              { label: 'Modelo',     value: 'Terra 54' },
              { label: 'Nº de série', value: 'ALT-001', variant: 'mono' },
              { label: 'Tipo',       value: <Badge label="DC" status="info" /> },
              { label: 'Potência',   value: '50 kW' },
            ]}
          />
          <DetailCard
            title="Status operacional"
            items={[
              { label: 'Status atual',       value: <Badge label="Ativo" status="success" /> },
              { label: 'Fonte',              value: 'OCPP (automático)' },
              { label: 'Última atualização', value: '22/05/2026 às 14:30' },
            ]}
          />
        </DetailGrid>
      </div>
    </div>
  ),
};

// ── Story: variantes de valor ─────────────────────────────────────────────────
export const VariantesDeValor: StoryObj = {
  name: 'Variantes de valor',
  render: () => (
    <div style={{ maxWidth: 500 }}>
      <DetailGrid>
        <DetailCard
          title="Todas as variantes"
          full
          items={[
            { label: 'Default',  value: 'Texto padrão' },
            { label: 'Mono',     value: 'ALT-001-XYZ', variant: 'mono' },
            { label: 'Dim',      value: '—', variant: 'dim' },
            { label: 'Strong',   value: 'R$ 1.280,00', variant: 'strong' },
          ]}
        />
      </DetailGrid>
    </div>
  ),
};
