import { tv, type VariantProps } from "tailwind-variants";
import { focusClasses } from "../../utils/classes";

export const button = tv(
  {
    base: [
      `rounded-lg py-1`,
      `items-center overflow-hidden justify-center shadow-md px-5 grid gap-1 grid-flow-col-dense`,
      `text-white hover:bg-opacity-80 bg-purple-500`,
      `transition-all duration-300 hover:scale-105`,
      ...focusClasses,
    ],
    variants: {
      variant: {
        solid: "",
        outlined: `bg-transparent hover:bg-opacity-10 border-2 border-purple-500`,
        text: `bg-transparent hover:bg-opacity-10`,
        float: `bg-opacity-25 hover:bg-opacity-40`,
      },
      type: {
        success: `bg-green-200 hover:bg-green-300 text-green-800`,
        danger: `bg-red-200 hover:bg-red-300 text-red-800`,
        disabled: `bg-gray-400 text-gray-200`,
      },
      outlined: {
        true: `bg-transparent border-2 border-purple-500`,
      },
      disableScaleEffect: {
        true: `transition-none duration-0 hover:scale-100`,
      },
    },
    compoundVariants: [
      {
        outlined: [true],
        className: "border-2 border-gray-800 text-gray-900",
      },
      {
        outlined: [true],
        type: ["disabled"],
        className: "bg-gray-200 border-2 border-gray-500 text-gray-500",
      },
      {
        outlined: [true],
        type: ["success"],
        className: `bg-transparent hover:bg-opacity-10 border-2 border-green-500`,
      },
      {
        outlined: [true],
        type: ["danger"],
        className: `bg-transparent hover:bg-opacity-10 border-2 border-red-500`,
      },
    ],
    defaultVariants: {
      variant: "solid",
    },
  },
  {
    twMerge: true,
  }
);

export type ButtonVariants = VariantProps<typeof button>;
