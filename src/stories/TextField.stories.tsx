import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import TextField from "../components/FormInput/TextField";
import {
  CheckBadgeIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/24/solid";

const meta: Meta = {
  title: "Remic/TextField",
  component: TextField,
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

const TextFieldTemplate: StoryFn<any> = (args) => {
  const [text, setMoney] = useState("");
  const [numText, setNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [ruleText, setRuleText] = useState("");

  return (
    <div className="flex flex-col space-y-2">
      <p>Common tables</p>
      <div className="grid grid-cols-4 gap-4">
        <TextField
          label="Error form"
          id="sample_form_1"
          error
          labelClassName="text-red-500"
          placeholder="Input Here ..."
          endIcon={<PresentationChartBarIcon className="w-5 h-5" />}
          fullWidth
          errormsg="This is error message abc"
          {...args}
        />
        <TextField
          label="Simple form"
          id="sample_form"
          placeholder="Input Here ..."
          fullWidth
          {...args}
        />
        <TextField
          label="Simple form with icon"
          id="sample_form"
          endIcon={<PresentationChartBarIcon className="w-5 h-5" />}
          placeholder="Input Here ..."
          fullWidth
          {...args}
        />
        <TextField
          label="Simple form with icon"
          id="sample_form"
          placeholder="Input Here ..."
          success
          successmsg="This is success message"
          successIcon={<CheckBadgeIcon className="w-5 h-5 text-green-500" />}
          fullWidth
          {...args}
        />
        <TextField
          label="Simple currency form"
          id="sample_form"
          placeholder="Input Here ..."
          onChange={(e) => setMoney(e.target.value)}
          value={text}
          formatter={{
            type: "money",
            execWhenChange: true,
            onError: (value) => {
              console.log("onError?", value);
            },
            currencySymbol: "Rp.",
          }}
          fullWidth
          {...args}
        />
        <TextField
          label="Simple number form"
          id="sample_form"
          placeholder="Input Here ..."
          onChange={(e) => setNumber(e.target.value)}
          value={numText}
          formatter={{
            type: "number",
            execWhenChange: true,
            onError: (value) => {
              console.log("onError?", value);
            },
          }}
          fullWidth
          {...args}
        />
        <TextField
          label="Simple phone number form"
          id="sample_form"
          placeholder="Input Here ..."
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          formatter={{
            type: "phone",
            execWhenChange: true,
            onError: (value) => {
              console.log("onError?", value);
            },
            decimalLimit: 4,
          }}
          fullWidth
          {...args}
        />
        <TextField
          label="Simple form with rules"
          id="sample_form"
          placeholder="Input Here ..."
          onChange={(e) => setRuleText(e.target.value)}
          value={ruleText}
          rules={{
            required: true,
            maxValue: 10,
            minValue: 5,
            onError(value) {
              const val =
                value === "required"
                  ? "This field is required"
                  : value === "min"
                  ? "This field must be greater than 5"
                  : "This field must be less than 10";
              return val;
            },
          }}
          fullWidth
          {...args}
        />
      </div>
    </div>
  );
};

export const Default = TextFieldTemplate.bind({});

Default.args = {};
