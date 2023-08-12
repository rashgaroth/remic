/* eslint-disable no-multi-assign */
import React from 'react';
import clsxm from '@remic/utils/clsxm';
import { ButtonProps } from '@remic/interfaces/component';
import { Loader } from '@remic/components/index'

function Button(props: ButtonProps) {
  const {
    danger,
    success,
    outlined,
    type,
    className,
    disabled,
    loading,
    ...rest
  } = props;
  return (
    <button
      {...rest}
      className={clsxm(
        `rounded-lg bg-opacity-25 hover:bg-opacity-40 
        shadow-md py-2 px-5 grid gap-1 grid-flow-col-dense
        items-center overflow-hidden justify-center`,
        'font-poppins font-extrabold',
        'disabled:bg-gray-400 disabled:text-gray-600 disabled:bg-opacity-60',
        'transition-all duration-300 hover:scale-105',
        'text-purple-800 hover:bg-purple-500 bg-purple-500',
        danger && 'bg-red-500 hover:bg-red-400 text-red-800',
        success && 'bg-green-500 hover:bg-green-400 text-green-800',
        outlined &&
          'bg-transparent hover:bg-opacity-10 border-2 border-purple-500',
        outlined &&
          danger &&
          'bg-transparent hover:bg-opacity-10 border-2 border-red-500',
        outlined &&
          success &&
          'bg-transparent hover:bg-opacity-10 border-2 border-green-500',
        outlined &&
          disabled &&
          'disabled:bg-gray-200 hover:bg-opacity-10 border-2 border-gray-500',
        className
      )}
      type={type ?? 'button'}
    >
      {loading && <Loader />}
      {rest.children}
    </button>
  );
}

export default Button;
