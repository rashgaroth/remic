/* eslint-disable no-multi-assign */
import React from 'react';
import clsxm from '../../utils/clsxm';
import { ButtonProps } from '../../interfaces/component';
import Loader from '../Loader';

function Button({ loading, ...rest }: ButtonProps) {
  return (
    <button
      className={clsxm(
        `rounded-lg bg-opacity-25 hover:bg-opacity-40 
        shadow-md py-2 px-5 grid gap-1 grid-flow-col-dense
        items-center overflow-hidden justify-center`,
        'font-poppins font-extrabold',
        'disabled:bg-gray-400 disabled:text-gray-600 disabled:bg-opacity-60',
        'transition-all duration-300 hover:scale-105',
        'text-purple-800 hover:bg-purple-500 bg-purple-500',
        rest.danger && 'bg-red-500 hover:bg-red-400 text-red-800',
        rest.success && 'bg-green-500 hover:bg-green-400 text-green-800',
        rest.outlined &&
          'bg-transparent hover:bg-opacity-10 border-2 border-purple-500',
        rest.outlined &&
          rest.danger &&
          'bg-transparent hover:bg-opacity-10 border-2 border-red-500',
        rest.outlined &&
          rest.success &&
          'bg-transparent hover:bg-opacity-10 border-2 border-green-500',
        rest.outlined &&
          rest.disabled &&
          'disabled:bg-gray-200 hover:bg-opacity-10 border-2 border-gray-500',
        rest.className
      )}
      type={rest.type ?? 'button'}
      {...rest}
    >
      {loading && <Loader />}
      {rest.children}
    </button>
  );
}

export default Button;
