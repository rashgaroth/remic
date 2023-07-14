import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Table } from '..';
import { ButtonProps } from '../interfaces/component';

const meta: Meta = {
  title: 'Remic/Table',
  component: Table,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const TableTemplate: StoryFn<ButtonProps> = (args) => (
  <div className="flex flex-col space-y-2">
    <p>Common buttons</p>
    <Table {...args} />
  </div>
);

export const Default = TableTemplate.bind({});

Default.args = {};
