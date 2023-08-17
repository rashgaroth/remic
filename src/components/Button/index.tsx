/* eslint-disable no-multi-assign */
import React, { ButtonHTMLAttributes } from "react";
import clsxm from "../../utils/clsxm";
import { Loader } from "..";
import useButton from "./useButton";

export type ButtonProps = {
  loading?: boolean;
  danger?: boolean;
  success?: boolean;
  outlined?: boolean;
  disableScaleEffect?: boolean;
  disableRippleEffect?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { getProps, buttonRef, renderRippleEffect, getClasses } =
      useButton(props);

    const {
      danger,
      success,
      outlined,
      type,
      className,
      disabled,
      loading,
      ...rest
    } = getProps();

    return (
      <button
        {...rest}
        ref={ref || buttonRef}
        className={clsxm(...getClasses(), className)}
        type={type ?? "button"}
      >
        {renderRippleEffect()}
        {loading && <Loader />}
        {rest.children}
      </button>
    );
  }
);

export default Button;
