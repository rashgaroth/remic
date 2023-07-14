import './styles/index.css';
import React, { FC, HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  /** custom content, defaults to 'the snozzberries taste like snozzberries' */
}

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
/**
 * A custom Thing component. Neat!
 */
export const Thing: FC<Props> = () => (
  <div className="bg-red-500 text-green-500">
    the snozzberries taste like snozzberries forever abc
  </div>
);
