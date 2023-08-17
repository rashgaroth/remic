import { useRef } from "react";
import { ButtonProps } from ".";
import useRippleEffect from "../../hooks/useRippleEffect";
import { ClassValue } from "clsx";

export default function useButton(props: ButtonProps) {
  const {
    danger,
    success,
    outlined,
    type,
    className,
    disabled,
    loading,
    disableRippleEffect,
    disableScaleEffect,
    ...rest
  } = props;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleEffect = useRippleEffect<HTMLButtonElement>(buttonRef, {
    color: outlined ? "#737373" : "#FFFF",
  });

  const renderRippleEffect = () => {
    if (disabled) {
      return null;
    }
    if (disableRippleEffect) {
      return null;
    }
    return rippleEffect;
  };

  const getClasses = (): ClassValue[] => {
    const classes = [
      `rounded-lg bg-opacity-25 hover:bg-opacity-40`,
      `shadow-md py-2 px-5 grid gap-1 grid-flow-col-dense`,
      `items-center overflow-hidden justify-center`,
      `font-poppins font-extrabold`,
      `text-purple-800 hover:bg-purple-500 bg-purple-500`,
    ];
    if (outlined && disabled) {
      classes.push(
        "disabled:bg-gray-400 border-2 border-gray-500 text-gray-500"
      );
    }
    if (outlined && !disabled) {
      classes.push(
        "bg-transparent hover:bg-opacity-10 border-2 border-purple-500"
      );
      if (success) {
        classes.pop();
        classes.push(
          "bg-transparent hover:bg-opacity-10 border-2 border-green-500"
        );
      }
      if (danger) {
        classes.pop();
        classes.push(
          "bg-transparent hover:bg-opacity-10 border-2 border-red-500"
        );
      }
    }

    if (!disabled) {
      if (!disableScaleEffect) {
        classes.push("transition-all duration-300 hover:scale-105");
      }
      if (danger) {
        classes.push("bg-red-500 hover:bg-red-400 text-red-800");
      }
      if (success) {
        classes.push("bg-green-500 hover:bg-green-400 text-green-800");
      }
    }

    if (disabled) {
      classes.push(
        "bg-gray-400 hover:bg-gray-400 text-gray-800 hover:bg-opacity-40"
      );
    }

    return classes;
  };

  const getProps = () => ({
    danger,
    success,
    outlined,
    type,
    className,
    disabled,
    loading,
    disableRippleEffect,
    disableScaleEffect,
    ...rest,
  });

  return {
    buttonRef,
    renderRippleEffect,
    getProps,
    getClasses,
  };
}
