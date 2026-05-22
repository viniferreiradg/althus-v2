import type { Meta, StoryObj } from '@storybook/react';
import { Search, X } from 'lucide-react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = { args: { placeholder: 'Digite aqui...' } };
export const WithLabel: Story = { args: { label: 'Nome completo', placeholder: 'Ex: Maria Silva' } };
export const WithHelper: Story = { args: { label: 'E-mail', placeholder: 'seu@email.com', helperText: 'Usado para login.' } };
export const WithError: Story = { args: { label: 'Senha', type: 'password', value: '123', error: 'Senha deve ter ao menos 8 caracteres.', readOnly: true } };
export const WithIcons: Story = { args: { label: 'Buscar', iconLeft: <Search size={16} />, iconRight: <X size={16} />, placeholder: 'Pesquisar...' } };
export const Disabled: Story = { args: { label: 'Campo desabilitado', value: 'Valor fixo', disabled: true, readOnly: true } };
export const SearchStory: Story = { args: { type: 'search', iconLeft: <Search size={16} />, placeholder: 'Pesquisar produtos...' } };
export const PasswordToggle: Story = { args: { label: 'Senha', toggleable: true, placeholder: '••••••••' } };
export const PasswordToggleWithError: Story = { args: { label: 'Senha', toggleable: true, placeholder: '••••••••', error: 'A senha deve ter ao menos 8 caracteres.' } };
