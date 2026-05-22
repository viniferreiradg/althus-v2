import type { Meta, StoryObj } from '@storybook/react';
import { PasswordStrength } from './PasswordStrength';

const meta: Meta<typeof PasswordStrength> = {
  title: 'Components/PasswordStrength',
  component: PasswordStrength,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
  parameters: {
    docs: {
      description: {
        component: 'Indicador visual de força de senha. Recebe o valor digitado e computa o score internamente. Usado abaixo de campos de senha em fluxos de criação/redefinição.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof PasswordStrength>;

export const Empty: Story = { args: { value: '' } };
export const Weak: Story = { args: { value: 'abcde' } };
export const Medium: Story = { args: { value: 'abcde123' } };
export const Good: Story = { args: { value: 'Abcde123' } };
export const Strong: Story = { args: { value: 'Abcde123!' } };
