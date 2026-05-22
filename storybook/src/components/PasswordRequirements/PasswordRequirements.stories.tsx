import type { Meta, StoryObj } from '@storybook/react';
import { PasswordRequirements } from './PasswordRequirements';

const meta: Meta<typeof PasswordRequirements> = {
  title: 'Components/PasswordRequirements',
  component: PasswordRequirements,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof PasswordRequirements>;

export const Default: Story = {
  args: { value: '' },
};

export const Error: Story = {
  args: { value: 'abc' },
};

export const Partial: Story = {
  args: { value: 'Password1' },
};

export const Success: Story = {
  args: { value: 'Password1!' },
};
