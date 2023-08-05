import React from 'react';
import { Chip } from '..';
import { ChipProps } from '../interfaces/component';
import { Meta, StoryFn } from '@storybook/react';
import { InformationCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

const meta: Meta = {
  title: 'Remic/Chip',
  component: Chip,
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

const ChipTemplate: StoryFn<ChipProps> = () => (
  <div className="flex flex-col space-y-4">
    <div>
      <p className="text-lg font-medium text-gray-800 mb-1">Common Chip</p>
      <div className="flex space-x-2">
        <Chip text="Default color" />
        <Chip text="Info color" color="info" />
        <Chip text="Danger color" color="danger" />
        <Chip text="Warning color" color="warning" />
        <Chip text="Success color" color="success" />
      </div>
    </div>
    <div>
      <p className="text-lg font-medium text-gray-800 mb-1">Outlined Chip</p>
      <div className="flex space-x-2">
        <Chip text="Default color" outlined />
        <Chip text="Info color" color="info" outlined />
        <Chip text="Danger color" color="danger" outlined />
        <Chip text="Warning color" color="warning" outlined />
        <Chip text="Success color" color="success" outlined />
      </div>
    </div>
    <div>
      <p className="text-lg font-medium text-gray-800 mb-1">Status Chip</p>
      <div className="flex space-x-2">
        <Chip text="Online" color="success" variant="status" />
        <Chip text="Busy" color="warning" variant="status" />
      </div>
      <div className="flex space-x-2 mt-2">
        <Chip text="Deployed" color="success" variant="status" />
        <Chip text="Deploying" color="warning" variant="status" />
        <Chip text="Failed" color="danger" variant="status" />
      </div>
    </div>
    <div>
      <p className="text-lg font-medium text-gray-800 mb-1">Clickable Chip</p>
      <div className="flex space-x-2">
        <Chip
          clickable
          text="Click Me"
          handleClick={() => console.log('Clicked')}
        />
        <Chip
          clickable
          text="Click Me"
          color="info"
          handleClick={() => console.log('Clicked')}
        />
      </div>
    </div>
    <div>
      <p className="text-lg font-medium text-gray-800 mb-1">With Icon Chip</p>
      <div className="flex space-x-2">
        <Chip
          text="Click Me"
          color="warning"
          startIcon={<InformationCircleIcon className="w-5 h-5" />}
        />
        <Chip
          clickable
          text="Delete"
          color="danger"
          endIcon={<XCircleIcon className="w-5 h-5" />}
        />
      </div>
    </div>
  </div>
);

export const Default = ChipTemplate.bind({});

Default.args = {};
