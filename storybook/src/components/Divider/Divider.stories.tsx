import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Separador horizontal. Usa --color-border-subtle para manter consistência com o tema.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {};
