import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { RangeSlider } from './RangeSlider';

const meta: Meta<typeof RangeSlider> = {
  title: 'Mobile/RangeSlider',
  component: RangeSlider,
  parameters: { layout: 'centered', backgrounds: { default: 'dark' } },
  decorators: [
    (Story) => (
      <div style={{ width: 320, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof RangeSlider>;

function Controlled(args: Partial<React.ComponentProps<typeof RangeSlider>>) {
  const [min, setMin] = useState(args.valueMin ?? 0);
  const [max, setMax] = useState(args.valueMax ?? 350);
  return (
    <RangeSlider
      {...args}
      valueMin={min}
      valueMax={max}
      onChangeMin={(v) => setMin(Math.min(v, max - (args.step ?? 10)))}
      onChangeMax={(v) => setMax(Math.max(v, min + (args.step ?? 10)))}
    />
  );
}

export const Default: Story = {
  render: () => <Controlled label="Potência" valueMin={50} valueMax={250} unit="kW" />,
};

export const FullRange: Story = {
  render: () => <Controlled label="Potência" valueMin={0} valueMax={350} unit="kW" />,
};
