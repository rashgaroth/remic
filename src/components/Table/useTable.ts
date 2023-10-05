// TODO

import React, { ReactNode, useMemo } from "react";
import { ClassValue } from "tailwind-variants";
import { safeVal } from "../../utils/common";

export type SortOptions = {
  onSort: () => void;
  order: "ASC" | "DESC";
};

export type SortProp = React.DetailedHTMLProps<
  React.TableHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  SortOptions;

export type HeaderProps = {
  label: string | ReactNode | ((props: SortProp) => ReactNode);
  key: string;
  icon?: ReactNode;
  alignment?: "left" | "right" | "center";
  width?: number;
  defaultSort?: "ASC" | "DESC";

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
  as?: React.ElementType;
  // data
  headers: HeaderProps[];
  data: TableDataProps[] | [] | null;

  showHeaderComponent?: boolean;
  headerComponent?: ReactNode;

  skeletonCount?: number;
  loading?: boolean;
  emptyMessage?: string | ReactNode;

  // pagination
  usePagination?: boolean;
  initialRowsPerPage?: number;
  rowsPerPageOptions?: number[];
  pageCount?: number;

  // common table props
  title?: string | ReactNode;
  description?: string;
  striped?: "even" | "odd";

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
  skeletonProps?: React.HTMLAttributes<HTMLTableSectionElement>;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  trProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  >;

  onSort?: (order: SortOptions["order"], key: HeaderProps["key"]) => void;
  onEdit?: (data: TableDataProps) => void;
  onDelete?: (data: TableDataProps) => void;
  onRowClick?: (
    data: TableDataProps,
    event: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>
  ) => void;
  onChecked?: (data: TableDataProps[] | TableDataProps) => void;
  onPageChange?: (page: number) => void;
};

export default function useTable(props: TableProps) {
  const {
    tableProps = {},
    tableBodyProps = {},
    descriptionProps = {},
    titleProps = {},
    tableHeadProps = {},

    headers,
    title,
    description,
    data,
    emptyMessage = "No data available",
    striped,

    usePagination = false,
    pageCount = 0,

    loading = false,
    skeletonCount = 5,
    skeletonProps = {},

    showHeaderComponent = true,
    headerComponent = null,
    containerProps,
    trProps,

    as,

    onRowClick,
    onChecked,
    onSort,
    onPageChange,
  } = props;

  const Component = as || "div";
  const [allChecked, setAllChecked] = React.useState(false);
  const [initialSort, setInitialSort] = React.useState<{
    [x: string]: "ASC" | "DESC";
  } | null>(null);

  const onTrClicked = (
    item: TableDataProps,
    ev: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>
  ) => {
    ev.preventDefault();
    if (onRowClick) {
      return onRowClick(item, ev);
    }
  };

  const onCheck = (item: TableDataProps) => {
    if (safeVal(item.defaultRemicChecked)) {
      item.defaultRemicChecked = !item.defaultRemicChecked;
    }
    onChecked && onChecked(item);
  };

  const onCheckAll = () => {
    setAllChecked(!allChecked);
    onChecked && onChecked((data && data) || []);
  };

  const getSkeletonArr = () => {
    const arr = [];
    for (let i = 0; i < skeletonCount; i++) {
      arr.push(i);
    }
    return arr;
  };

  const handleSort = (key: HeaderProps["key"]) => {
    const order = initialSort?.[key] || "ASC";
    const newOrder = order === "ASC" ? "DESC" : "ASC";
    setInitialSort((prev) => ({
      ...prev,
      [key]: newOrder,
    }));
    if (onSort) {
      onSort(newOrder, key);
    }
  };

  const getAlignment = (alignment: "left" | "center" | "right") => {
    switch (alignment) {
      case "left":
        return "text-left";
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };

  return useMemo(
    () => ({
      Component,
      onCheck,
      onCheckAll,
      onTrClicked,
      handleSort,
      getAlignment,
      getSkeletonArr,
      onPageChange,
      onRowClick,
      onChecked,
      onSort,
      allChecked,
      initialSort,
      tableProps,
      tableBodyProps,
      descriptionProps,
      titleProps,
      tableHeadProps,
      headers,
      title,
      description,
      data,
      emptyMessage,
      striped,
      usePagination,
      pageCount,
      loading,
      skeletonCount,
      skeletonProps,
      showHeaderComponent,
      headerComponent,
      containerProps,
      trProps,
    }),
    [
      headerComponent,
      showHeaderComponent,
      skeletonProps,
      skeletonCount,
      loading,
      pageCount,
      usePagination,
      data,
      headers,
    ]
  );
}
