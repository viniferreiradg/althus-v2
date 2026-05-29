import type { Meta, StoryObj } from '@storybook/react';
import { VehicleChip } from './VehicleChip';

const meta: Meta<typeof VehicleChip> = {
  title: 'Mobile/VehicleChip',
  component: VehicleChip,
  parameters: { layout: 'centered', backgrounds: { default: 'dark' } },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof VehicleChip>;

export const Default: Story = {
  args: { name: 'Tesla Model Y' },
};

export const LongName: Story = {
  args: { name: 'Volkswagen ID.4 Pro Performance' },
};
