import { ClassValue } from 'clsx';
import {
  ButtonHTMLAttributes,
  ChangeEvent,
  ComponentProps,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from 'react';

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

export type DropdownInputProps = {
  onSearch?: (value: ChangeEvent<HTMLInputElement>) => void;
  loaderColor?: string;
  loading?: boolean;
  data: AsyncDropdownData[];
  onChange?: (value: AsyncDropdownData | null) => void;
  onOpen?: () => void;
  onClose?: (
    e:
      | React.FocusEvent<HTMLInputElement, Element>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  initValue?: AsyncDropdownData;
  dropdownValue?: AsyncDropdownData | null | undefined;
  CloseIcon?: ReactNode;
  disableType?: boolean;
  textFieldProps?: TextFieldProps;
  label?: string;
  placeholder?: string;
  width?: number;
  dropdownClassName?: ClassValue;
  className?: ClassValue;
} & InputHTMLAttributes<HTMLInputElement>;

export type ChipProps = {
  text?: string;
  loading?: boolean;
  color?: 'info' | 'success' | 'danger' | 'warning' | string
  outlined?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  variant?: 'basic' | 'status';
  clickable?: boolean;
  handleClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
} & HTMLAttributes<HTMLDivElement>

export type SortOptions = {
  onSort: (key: string) => void;
  order: 'ASC' | 'DESC';
  icon?: ReactNode;
  showDefault?: boolean;
};

export type HeaderProps = {
  label: string | ReactNode;
  key: string;
  icon?: ReactNode;
  alignment?: 'left' | 'right' | 'center';
  sort?: SortOptions;
  width?: number;

  thProps?: React.DetailedHTMLProps<
    React.ThHTMLAttributes<HTMLTableHeaderCellElement>,
    HTMLTableHeaderCellElement
  >;
  tdProps?: React.DetailedHTMLProps<
    React.TdHTMLAttributes<HTMLTableDataCellElement>,
    HTMLTableDataCellElement
  >;

  thClassName?: ClassValue;
  tdClassName?: ClassValue;
  renderData?: (data: string | number | boolean | unknown) => ReactNode;
};

export type TableDataProps = {
  [x: string]: any;
  defaultRemicChecked?: boolean;
  disabledChecked?: boolean;
};

export type TableProps = {
  headers: HeaderProps[];
  data: TableDataProps[] | [] | null;
  loading?: boolean;
  emptyMessage?: string | ReactNode;
  usePagination?: boolean;
  title?: string | ReactNode;
  description?: string;
  striped?: 'even' | 'odd';

  titleProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >;
  descriptionProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >;
  tableProps?: React.DetailedHTMLProps<
    React.TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  >;
  tableBodyProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  >;
  tableHeadProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  >;

  useSkeleton?: boolean;
  onEdit?: (data: TableDataProps) => void;
  onDelete?: (data: TableDataProps) => void;
  onRowClick?: (
    data: TableDataProps,
    event: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>
  ) => void;
  onChecked?: (data: TableDataProps[] | TableDataProps) => void;
  initialRowsPerPage?: number;
  rowsPerPageOptions?: number[];
  page?: number;
};

export type CheckboxProps = {
  label?: string;
  checked?: boolean;
  onChange?: (
    ev: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  className?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
};

export type PaginationProps = {
  totalPage: number;
  onPageChange?: (page: number) => void;
  className?: ClassValue;
  boxClassName?: ClassValue;
  showCalculatedPage?: boolean;
};
