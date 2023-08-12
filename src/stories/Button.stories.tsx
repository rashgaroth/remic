import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Button } from "..";
import { ButtonProps } from "../interfaces/component";

const meta: Meta = {
  title: "Remic/Buttons",
  component: Button,
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

const ButtonTemplate: StoryFn<ButtonProps> = (args) => (
  <div className="flex flex-col space-y-2">
    <p>Common buttons</p>
    <div className="grid grid-flow-col gap-5">
      <Button {...args}>
        <p>Button!</p>
      </Button>
      <Button loading disabled {...args}>
        <p>Loading button</p>
      </Button>
      <Button disabled {...args}>
        <p>Disabled</p>
      </Button>
      <Button danger {...args}>
        <p>Danger</p>
      </Button>
      <Button success {...args}>
        <p>Success</p>
      </Button>
    </div>
    <p>Outlined buttons</p>
    <div className="grid grid-flow-col gap-5">
      <Button outlined {...args}>
        <p>Button!</p>
      </Button>
      <Button loading outlined {...args}>
        <p>Loading button</p>
      </Button>
      <Button disabled outlined {...args}>
        <p>Disabled</p>
      </Button>
      <Button danger outlined {...args}>
        <p>Danger</p>
      </Button>
      <Button success outlined {...args}>
        <p>Success</p>
      </Button>
    </div>
  </div>
);

export const Default = ButtonTemplate.bind({});

Default.args = {};
