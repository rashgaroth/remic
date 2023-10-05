/* eslint-disable no-multi-assign */
import React, {
  ButtonHTMLAttributes,
  useImperativeHandle,
  useRef,
} from "react";
import { Loader } from "..";
import useButton from "./useButton";

export type ButtonProps = {
  loading?: boolean;
  danger?: boolean;
  success?: boolean;
  outlined?: boolean;
  disableScaleEffect?: boolean;
  disableRippleEffect?: boolean;
  loaderAlignment?: "left" | "right";
  as?: React.ElementType;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    const innerRef = useRef<HTMLButtonElement>(null);

    useImperativeHandle(ref, () => innerRef.current as HTMLButtonElement, [
      ref,
    ]);

    const { getProps, buttonRef, renderRippleEffect, getClasses, Component } =
      useButton({ ...props }, innerRef);

    const {
      danger,
      success,
      outlined,
      type,
      className,
      disabled,
      loading = false,
      disableRippleEffect = false,
      disableScaleEffect = false,
      loaderAlignment = "right",
      ...rest
    } = getProps();

    return (
      <Component
        {...rest}
        ref={buttonRef}
        className={getClasses}
        type={type ?? "button"}
      >
        {renderRippleEffect()}
        {loading && loaderAlignment === "left" && <Loader />}
        {rest.children}
        {loading && loaderAlignment === "right" && <Loader />}
      </Component>
    );
  }
);

export default Button;
