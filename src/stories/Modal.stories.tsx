import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Button, Modal } from "..";
import { ModalProps } from "../components/Modal";

const meta: Meta = {
  title: "Remic/Modal",
  component: Modal,
  argTypes: {
    children: {
      control: {
        type: "text",
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const ModalTemplate: StoryFn<ModalProps> = (args) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAnimationOpen, setModalAnimationOpen] = useState(false);
  return (
    <div className="flex flex-col space-y-2">
      <p>Base modal</p>
      <div className="flex flex-col space-y-4">
        <>
          <span className="max-w-xs">
            <Button
              onClick={() => {
                setModalOpen(true);
              }}
            >
              <p>Open Base Modal</p>
            </Button>
          </span>
          <Modal
            {...args}
            disableAnimation
            open={modalOpen}
            headerTitle="Header Title Example"
            close={() => setModalOpen(false)}
          >
            <Modal.Header alignment="center">
              <p>Header Title Example</p>
            </Modal.Header>
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
            <Modal.Footer alignment="left">
              <Button danger onClick={() => setModalOpen(false)}>
                <p>Send !</p>
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </div>
      <p>AnimatedModal</p>
      <div className="flex flex-col space-y-4">
        <>
          <span className="max-w-xs">
            <Button
              onClick={() => {
                setModalAnimationOpen(true);
              }}
            >
              <p>Open animated modal</p>
            </Button>
          </span>
          <Modal
            {...args}
            open={modalAnimationOpen}
            id="modal-animation"
            headerTitle="Header Animation Example"
            close={() => setModalAnimationOpen(false)}
          >
            <Modal.Header alignment="left">
              <p>Header Title Example</p>
            </Modal.Header>
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
            <Modal.Footer alignment="left">
              <Button danger onClick={() => setModalAnimationOpen(false)}>
                <p>Send !</p>
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </div>
    </div>
  );
};

export const Default = ModalTemplate.bind({});

Default.args = {};
