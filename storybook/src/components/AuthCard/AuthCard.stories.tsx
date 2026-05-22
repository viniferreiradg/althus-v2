import type { Meta, StoryObj } from '@storybook/react';
import { AuthCard } from './AuthCard';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Feedback } from '../Feedback/Feedback';

const meta: Meta<typeof AuthCard> = {
  title: 'Components/AuthCard',
  component: AuthCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Container de tela inteira para fluxos de autenticação. Exibe fundo escuro com blobs decorativos da brand, logo centralizada e card com glass effect. Usado em: login, criar senha, esqueci senha, redefinir senha e link inválido.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof AuthCard>;

export const Default: Story = {
  args: {
    title: 'Crie sua senha',
    description: 'Defina uma senha segura para acessar o painel.',
  },
  render: (args) => (
    <AuthCard {...args}>
      <Input label="Nova senha" type="password" placeholder="••••••••" />
      <Input label="Confirmar senha" type="password" placeholder="••••••••" />
      <Button style={{ width: '100%' }}>Criar senha</Button>
    </AuthCard>
  ),
};

export const WithEmailReadOnly: Story = {
  args: {
    title: 'Crie sua senha',
    description: 'Você foi convidado para acessar o painel Althus. Defina sua senha para continuar.',
  },
  render: (args) => (
    <AuthCard {...args}>
      <Input label="E-mail" value="admin@rede.com.br" disabled readOnly />
      <Input label="Nova senha" type="password" placeholder="••••••••" />
      <Input label="Confirmar senha" type="password" placeholder="••••••••" />
      <Button style={{ width: '100%' }}>Criar senha</Button>
    </AuthCard>
  ),
};

export const WithError: Story = {
  args: {
    title: 'Crie sua senha',
    description: 'Defina uma senha segura para acessar o painel.',
  },
  render: (args) => (
    <AuthCard {...args}>
      <Feedback type="error" message="As senhas não coincidem. Tente novamente." />
      <Input label="Nova senha" type="password" placeholder="••••••••" error="Verifique sua senha." />
      <Input label="Confirmar senha" type="password" placeholder="••••••••" error="Verifique sua senha." />
      <Button style={{ width: '100%' }}>Criar senha</Button>
    </AuthCard>
  ),
};

export const LoginVariant: Story = {
  args: {
    title: 'Bem-vindo de volta',
    description: 'Acesse o painel da sua rede.',
  },
  render: (args) => (
    <AuthCard {...args}>
      <Input label="E-mail" type="email" placeholder="seu@email.com.br" />
      <Input label="Senha" type="password" placeholder="••••••••" />
      <Button style={{ width: '100%' }}>Entrar</Button>
    </AuthCard>
  ),
};
