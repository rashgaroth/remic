import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Button, Modal } from '..';
import { ModalProps } from '../interfaces/component';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

const meta: Meta = {
  title: 'Remic/Modal',
  component: Modal,
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

const ModalTemplate: StoryFn<ModalProps> = (args) => {
  const [modalOpen, setModalOpen] = useState([false, false, false]);
  return (
    <div className="flex flex-col space-y-2">
      <p>Common modal</p>
      <div className="flex flex-col space-y-4">
        <>
          <span className="max-w-xs">
            <Button
              onClick={() =>
                setModalOpen((prev) => [!prev[0], prev[1], prev[2]])
              }
            >
              <p>With Header</p>
            </Button>
          </span>
          <Modal
            {...args}
            open={modalOpen[0]}
            headerTitle="Header Title Example"
            theme="light"
            close={() => setModalOpen((prev) => [!prev[0], prev[1], prev[2]])}
          >
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              egestas molestie laoreet. Nulla id felis massa. Nunc et metus non
              lectus fringilla viverra vitae id dui. Pellentesque malesuada ante
              at magna consequat dictum. Etiam interdum nibh ornare mi sodales
              blandit. Donec rhoncus malesuada bibendum. Nulla sagittis dolor
              neque, vitae luctus orci ultricies a. Donec venenatis malesuada
              diam id consectetur. Proin risus ligula, suscipit nec diam ut,
              vehicula scelerisque nulla. Vivamus condimentum mattis velit, vel
              elementum nunc condimentum at.
            </p>
            <div className="w-full flex justify-end">
              <Button danger>
                <p>Send !</p>
              </Button>
            </div>
          </Modal>
        </>
        <>
          <span className="max-w-xs">
            <Button
              onClick={() =>
                setModalOpen((prev) => [prev[0], !prev[1], prev[2]])
              }
            >
              <p>Without Header</p>
            </Button>
          </span>
          <Modal
            {...args}
            open={modalOpen[1]}
            disableHeader
            theme="light"
            close={() => setModalOpen((prev) => [prev[0], !prev[1], prev[2]])}
          >
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              egestas molestie laoreet. Nulla id felis massa. Nunc et metus non
              lectus fringilla viverra vitae id dui. Pellentesque malesuada ante
              at magna consequat dictum. Etiam interdum nibh ornare mi sodales
              blandit. Donec rhoncus malesuada bibendum. Nulla sagittis dolor
              neque, vitae luctus orci ultricies a. Donec venenatis malesuada
              diam id consectetur. Proin risus ligula, suscipit nec diam ut,
              vehicula scelerisque nulla. Vivamus condimentum mattis velit, vel
              elementum nunc condimentum at.
            </p>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              egestas molestie laoreet. Nulla id felis massa. Nunc et metus non
              lectus fringilla viverra vitae id dui. Pellentesque malesuada ante
              at magna consequat dictum. Etiam interdum nibh ornare mi sodales
              blandit. Donec rhoncus malesuada bibendum. Nulla sagittis dolor
              neque, vitae luctus orci ultricies a. Donec venenatis malesuada
              diam id consectetur. Proin risus ligula, suscipit nec diam ut,
              vehicula scelerisque nulla. Vivamus condimentum mattis velit, vel
              elementum nunc condimentum at.
            </p>
            <br />
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              egestas molestie laoreet. Nulla id felis massa. Nunc et metus non
              lectus fringilla viverra vitae id dui. Pellentesque malesuada ante
              at magna consequat dictum. Etiam interdum nibh ornare mi sodales
              blandit. Donec rhoncus malesuada bibendum. Nulla sagittis dolor
              neque, vitae luctus orci ultricies a. Donec venenatis malesuada
              diam id consectetur. Proin risus ligula, suscipit nec diam ut,
              vehicula scelerisque nulla. Vivamus condimentum mattis velit, vel
              elementum nunc condimentum at.
            </p>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              egestas molestie laoreet. Nulla id felis massa. Nunc et metus non
              lectus fringilla viverra vitae id dui. Pellentesque malesuada ante
              at magna consequat dictum. Etiam interdum nibh ornare mi sodales
              blandit. Donec rhoncus malesuada bibendum. Nulla sagittis dolor
              neque, vitae luctus orci ultricies a. Donec venenatis malesuada
              diam id consectetur. Proin risus ligula, suscipit nec diam ut,
              vehicula scelerisque nulla. Vivamus condimentum mattis velit, vel
              elementum nunc condimentum at.
            </p>
            <br />
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              egestas molestie laoreet. Nulla id felis massa. Nunc et metus non
              lectus fringilla viverra vitae id dui. Pellentesque malesuada ante
              at magna consequat dictum. Etiam interdum nibh ornare mi sodales
              blandit. Donec rhoncus malesuada bibendum. Nulla sagittis dolor
              neque, vitae luctus orci ultricies a. Donec venenatis malesuada
              diam id consectetur. Proin risus ligula, suscipit nec diam ut,
              vehicula scelerisque nulla. Vivamus condimentum mattis velit, vel
              elementum nunc condimentum at.
            </p>
          </Modal>
        </>
        <>
          <span className="max-w-xs">
            <Button
              onClick={() =>
                setModalOpen((prev) => [prev[0], prev[1], !prev[2]])
              }
            >
              <p>Overrided header style</p>
            </Button>
          </span>
          <Modal
            {...args}
            open={modalOpen[2]}
            headerTitle="Header Title Example"
            overrides={{
              header: {
                className: 'bg-blue-500',
                closeIcon: ExclamationCircleIcon,
              },
            }}
            close={() => setModalOpen((prev) => [prev[0], prev[1], !prev[2]])}
          >
            Hellow
          </Modal>
        </>
      </div>
    </div>
  );
};

export const Default = ModalTemplate.bind({});

Default.args = {};
