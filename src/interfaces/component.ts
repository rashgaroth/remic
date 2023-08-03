import {
  ButtonHTMLAttributes,
  ChangeEvent,
  ComponentProps,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from 'react';
import { TextField } from '../components';

export type ButtonProps = {
  loading?: boolean;
  danger?: boolean;
  success?: boolean;
  outlined?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type FormatterInput = {
  type: 'money' | 'phone' | 'number';
  customRegex?: RegExp;
  execWhenChange?: boolean;
  onError?: (value: string) => void;
  currencySymbol?: string;
  decimalLimit?: number;
  separator?: string;
};

export type Rules = {
  maxValue?: number;
  minValue?: number;
  required?: boolean;
  onError?: (value: 'max' | 'required' | 'min') => string;
};

export type TextFieldProps<T = HTMLInputElement> = {
  label?: string;
  fullWidth?: boolean;
  width?: number;
  rules?: Rules;
  // icons
  endIcon?: ReactNode;
  // formatter
  formatter?: FormatterInput;
  // error
  errorIcon?: ReactNode;
  error?: boolean;
  errormsg?: string;
  // success
  success?: boolean;
  successmsg?: string;
  successIcon?: ReactNode;
  // label
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  LabelComponent?: ReactNode;
  labelClassName?: ComponentProps<'label'>['className'];
} & InputHTMLAttributes<T>;

export type AsyncDropdownData = {
  label: string;
  value: any;
};

export type AsyncTextFieldProps = {
  onSearch?: (value: ChangeEvent<HTMLInputElement>) => void;
  loaderColor?: string;
  loading?: boolean;
  data: AsyncDropdownData[];
  onChange?: (value: AsyncDropdownData) => void;
  onOpen?: () => void;
  onClose?: () => void;
  initValue?: AsyncDropdownData;
  dropdownValue?: AsyncDropdownData;
} & TextFieldProps;
