import { useMemo, useRef } from "react";
import { ButtonProps } from ".";
import useRippleEffect from "../../hooks/useRippleEffect";
import { button } from "./tv";

export default function useButton(
  props: ButtonProps,
  ref?: React.RefObject<HTMLButtonElement>
) {
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
    as,
    ...rest
  } = props;
  const Component = as || "button";

  const buttonRef = ref || useRef<HTMLButtonElement>(null);
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

  const getButtonVariant = ():
    | "disabled"
    | "success"
    | "danger"
    | undefined => {
    if (disabled) {
      return "disabled";
    }
    if (danger) {
      return "danger";
    }
    if (success) {
      return "success";
    }
    return undefined;
  };

  const getClasses = useMemo(
    () =>
      button({
        className,
        type: getButtonVariant(),
        disableScaleEffect,
        outlined,
      }),
    [className, outlined]
  );

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
    Component,
  };
}
