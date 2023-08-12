import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Table } from '..';
import { HeaderProps, TableProps } from '../interfaces/component';

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

const headers: HeaderProps[] = [
  {
    key: 'name',
    label: (
      <div>
        <p className="text-gray-900">Name</p>
        <p className="text-[10px] font-normal text-gray-400">
          This is the description of the name
        </p>
      </div>
    ),
  },
  {
    key: 'title',
    label: 'Title',
  },
  {
    key: 'email',
    label: 'Email',
  },
  {
    key: 'active',
    label: 'Status',
    renderData(data) {
      if (data && data === true) {
        return <p className="text-green-500">Active</p>;
      }
      return <p className="text-red-500">Inactive</p>;
    },
  },
];

const data = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay@gmail.com',
    active: true,
  },
  {
    name: 'Lindsay Waltonis',
    title: 'Back-end Developer',
    email: 'lindsay@gmail.com',
    active: true,
  },
  {
    name: 'Lindsay Waltonis',
    title: 'Back-end Developer',
    email: 'lindsay@gmail.com',
    active: true,
  },
  {
    name: 'Lindsay Waltonis',
    title: 'Back-end Developer',
    email: 'lindsay@gmail.com',
    active: true,
  },
  {
    name: 'Lindsay Waltonous',
    title: 'Fullstack Developer',
    email: 'lindsay@gmail.com',
    active: false,
    disabledChecked: true,
    defaultRemicChecked: true,
  },
];

const TableTemplate: StoryFn<TableProps> = () => {
  return (
    <div className="flex flex-col space-y-2">
      <Table
        title="This is the sample of remic table"
        headers={headers}
        onChecked={(data) => {
          console.log('onChecked', data);
        }}
        striped="odd"
        description="This is the description of the table."
        data={data}
      />
    </div>
  );
};

export const Default = TableTemplate.bind({});

Default.args = {};
