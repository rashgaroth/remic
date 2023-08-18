import { tv } from "../../utils/tv";

// TODO: tailwind classess using tv
export const buttonTv = tv({
  base: [
    "rounded-lg",
    "bg-opacity-25",
    "hover:bg-opacity-40",
    "shadow-md",
    "py-2",
    "px-5",
    "grid",
    "gap-1",
    "grid-flow-col-dense",
    "items-center",
    "overflow-hidden",
    "justify-center",
    "font-poppins",
    "font-extrabold",
    "text-purple-800",
  ],
  variants: {
    disabled: {
      true: "disabled:bg-gray-400 border-2 border-gray-500 text-gray-500",
    },
    type: {
      outlined: "hover:bg-opacity-10 border-2 border-purple-500",
      solid: "bg-purple-500 hover:bg-purple-400",
    },
    success: {
      true: "hover:bg-opacity-10 border-2 border-green-500",
    },
    danger: {
      true: "hover:bg-opacity-10 border-2 border-red-500",
    },
    disableScaleEffect: {
      false: "transition-all duration-300 hover:scale-105",
    },
  },
  compoundVariants: [
    {
      type: "outlined",
      className: "bg-transparent",
    },
  ],
});
