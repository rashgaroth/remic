import { ButtonHTMLAttributes } from 'react';

export type ButtonProps = {
  loading?: boolean;
  danger?: boolean;
  success?: boolean;
  outlined?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;
