import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof Pagination>;

function Controlled(props: { page?: number; pageSize?: number; total?: number }) {
  const [page, setPage] = useState(props.page ?? 1);
  return (
    <div style={{ background: 'var(--color-bg-surface)', borderRadius: 'var(--radius-sm)' }}>
      <Pagination
        page={page}
        pageSize={props.pageSize ?? 10}
        total={props.total ?? 47}
        onChange={setPage}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <Controlled page={1} pageSize={10} total={47} />,
};

export const MidPage: Story = {
  render: () => <Controlled page={3} pageSize={10} total={47} />,
};

export const ManyPages: Story = {
  render: () => <Controlled page={5} pageSize={10} total={200} />,
};

export const LastPage: Story = {
  render: () => <Controlled page={5} pageSize={10} total={47} />,
};

export const SinglePage: Story = {
  render: () => <Controlled page={1} pageSize={10} total={8} />,
};

export const Empty: Story = {
  render: () => <Controlled page={1} pageSize={10} total={0} />,
};
