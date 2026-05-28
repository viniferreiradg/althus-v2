import type { Meta, StoryObj } from '@storybook/react';
import { UserPin } from './UserPin';

const meta: Meta<typeof UserPin> = {
  title: 'Mobile/UserPin',
  component: UserPin,
  parameters: { layout: 'centered', backgrounds: { default: 'dark' } },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof UserPin>;

export const Default: Story = {
  args: { 'aria-label': 'Sua localização' },
};
