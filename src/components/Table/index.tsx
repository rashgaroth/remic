"use client";

import React from "react";
import { isZeroArray, safeArray, safeVal } from "../../utils/common";
import clsxm from "../../utils/clsxm";
import { ClassValue } from "clsx";
import Checkbox from "../../components/Checkbox";
import Pagination from "../../components/Pagination";
import useTable, {
  HeaderProps,
  SortProp,
  TableDataProps,
  TableProps,
} from "./useTable";

function Skeleton(props?: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="animate-pulse w-full bg-gray-300 rounded-lg h-5"
      {...props}
    />
  );
}

function Td({
  alignment,
  tdProps,
  children,
  onClick,
  className,
}: {
  alignment: HeaderProps["alignment"];
  tdProps: HeaderProps["tdProps"];
  children: React.ReactNode;
  onClick?: (
    event: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>
  ) => void;
  className?: ClassValue;
}) {
  return (
    <td
      className={clsxm(
        "px-3 py-4 text-sm font-normal text-gray-900",
        `text-${alignment}`,
        className
      )}
      onClick={onClick}
      {...tdProps}
    >
      {children}
    </td>
  );
}

function Table(props: TableProps) {
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
    skeletonProps = {},
    allChecked,
    initialSort,
    showHeaderComponent,
    containerProps,
    trProps,

    onRowClick,
    onChecked,
    onPageChange,
    handleSort,
    onCheckAll,
    onCheck,
    onTrClicked,
    getSkeletonArr,
    getAlignment,

    Component,
    headerComponent,
  } = useTable(props);

  const getLabelRenderer = (
    label: HeaderProps["label"],
    key: HeaderProps["key"]
  ) => {
    if (typeof label === "function") {
      const sortOpts = {
        onSort: () => handleSort(key),
        order: initialSort?.[key] || "ASC",
      } as SortProp;

      if (React.isValidElement(label(sortOpts))) {
        return React.cloneElement<SortProp>(<div>{label(sortOpts)}</div>);
      }
      return label(sortOpts);
    }
    return label;
  };

  return (
    <Component className="px-4 sm:px-6 lg:px-8">
      {showHeaderComponent && React.isValidElement(headerComponent) ? (
        headerComponent
      ) : (
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto mb-2">
            {title &&
              (typeof title === "string" ? (
                <h1
                  className="mx-0 text-base sm:-mx-6 lg:-mx-8 font-semibold leading-6 text-gray-900"
                  {...titleProps}
                >
                  {title}
                </h1>
              ) : (
                title
              ))}
            {description &&
              (typeof description === "string" ? (
                <p
                  className="mt-0 mb-2 text-sm text-gray-700 mx-0 sm:-mx-6 lg:-mx-8"
                  {...descriptionProps}
                >
                  {description}
                </p>
              ) : (
                description
              ))}
          </div>
        </div>
      )}
      <div
        className="mx-0 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 bg-white rounded-lg shadow-xl"
        {...containerProps}
      >
        <div className="inline-block min-w-full align-middle mx-0 sm:-mx-0">
          <table className="min-w-full divide-gray-300" {...tableProps}>
            <thead
              {...tableHeadProps}
              className={clsxm("bg-gray-200", tableHeadProps.className)}
            >
              <tr className="divide-x-2 divide-gray-100" {...trProps}>
                {safeArray<HeaderProps>(headers).map((header, index) => {
                  const { alignment = "left", thClassName = "" } = header;
                  const key = `${header.key}-${index}`;
                  const shouldRenderCheckbox = !!(onChecked && index === 0);

                  return (
                    <th
                      key={key}
                      scope="col"
                      className={clsxm(
                        "px-3 py-3.5 text-sm font-semibold text-gray-900 sm:table-cell mb-2",
                        getAlignment(alignment),
                        thClassName
                      )}
                      style={{
                        width: header.width || "auto",
                      }}
                      {...header.thProps}
                    >
                      {shouldRenderCheckbox ? (
                        <div className="flex flex-row items-center space-x-2">
                          <Checkbox onChange={onCheckAll} />
                          <div>
                            {getLabelRenderer(header.label, header.key) || ""}
                          </div>
                        </div>
                      ) : (
                        <div>
                          {getLabelRenderer(header.label, header.key) || ""}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody
              className={clsxm("divide-y divide-gray-300 bg-white")}
              {...tableBodyProps}
            >
              {!loading
                ? data &&
                  safeArray(data as TableDataProps[]).map((item, index) => {
                    return (
                      <tr
                        key={index}
                        className={clsxm(
                          onRowClick && "cursor-pointer hover:bg-gray-100",
                          striped === "even" && index % 2 === 0 && "bg-gray-50",
                          striped === "odd" && index % 2 !== 0 && "bg-gray-50",
                          "z-0"
                        )}
                      >
                        {headers.map((header, headerIndex) => {
                          const { alignment = "left", tdClassName = "" } =
                            header;
                          const customRender = header.renderData;
                          const shouldRenderCheckbox = !!(
                            onChecked && headerIndex === 0
                          );
                          const hasDefaultChecked = !!(
                            safeVal(item.defaultRemicChecked) && onCheck
                          );
                          const hasCheckedDisabled = !!(
                            safeVal(item.disabledChecked) && onCheck
                          );

                          if (customRender) {
                            return (
                              <Td
                                alignment={alignment}
                                tdProps={header.tdProps}
                                key={headerIndex}
                                onClick={
                                  shouldRenderCheckbox
                                    ? undefined
                                    : (ev) => onTrClicked(item, ev)
                                }
                                className={clsxm(
                                  headerIndex === 0 && "rounded-l-xl",
                                  headerIndex === headers.length - 1 &&
                                    "rounded-r-xl",
                                  "z-0",
                                  tdClassName
                                )}
                              >
                                {shouldRenderCheckbox ? (
                                  <div className="relative flex flex-row items-center space-x-2 z-20">
                                    <Checkbox
                                      id={`checkbox-${headerIndex}-${header.key}`}
                                      checked={
                                        hasDefaultChecked
                                          ? item.defaultRemicChecked
                                          : allChecked
                                      }
                                      disabled={
                                        hasCheckedDisabled
                                          ? item.disabledChecked
                                          : false
                                      }
                                      className="absolute z-50 inset-0"
                                      onChange={() => onCheck(item)}
                                    />
                                    <div className="pl-7">
                                      {customRender(item?.[header.key] || "")}
                                    </div>
                                  </div>
                                ) : (
                                  customRender(item?.[header.key] || "")
                                )}
                              </Td>
                            );
                          }
                          return (
                            <Td
                              alignment={alignment}
                              tdProps={header.tdProps}
                              key={headerIndex}
                              onClick={
                                shouldRenderCheckbox
                                  ? undefined
                                  : (ev) => onTrClicked(item, ev)
                              }
                              className={clsxm(
                                headerIndex === 0 && "rounded-l-xl",
                                headerIndex === headers.length - 1 &&
                                  "rounded-r-xl",
                                "z-0",
                                tdClassName
                              )}
                            >
                              {shouldRenderCheckbox ? (
                                <div className="relative flex flex-row items-center space-x-2 z-20">
                                  <Checkbox
                                    checked={
                                      hasDefaultChecked
                                        ? item.defaultRemicChecked
                                        : allChecked
                                    }
                                    id={`checkbox-${headerIndex}-${header.key}`}
                                    disabled={
                                      hasCheckedDisabled
                                        ? item.disabledChecked
                                        : false
                                    }
                                    className="absolute z-50 inset-0"
                                    onChange={() => onCheck(item)}
                                  />
                                  <div className="pl-7">
                                    {item?.[header.key] || ""}
                                  </div>
                                </div>
                              ) : (
                                item?.[header.key] || ""
                              )}
                            </Td>
                          );
                        })}
                      </tr>
                    );
                  })
                : getSkeletonArr().map((_, index) => (
                    <tr
                      key={index}
                      className={clsxm(
                        onRowClick && "cursor-pointer hover:bg-gray-100",
                        striped === "even" && index % 2 === 0 && "bg-gray-50",
                        striped === "odd" && index % 2 !== 0 && "bg-gray-50",
                        "z-0"
                      )}
                    >
                      {headers.map((header, headerIndex) => {
                        return (
                          <Td
                            key={headerIndex}
                            alignment={header.alignment}
                            tdProps={header.tdProps}
                          >
                            <Skeleton {...skeletonProps} />
                          </Td>
                        );
                      })}
                    </tr>
                  ))}
            </tbody>
          </table>
          {!data ||
            (isZeroArray(data) && (
              <div className="flex w-full items-center justify-center mt-5">
                {typeof emptyMessage === "string" ? (
                  <p className="text-sm">{emptyMessage}</p>
                ) : (
                  emptyMessage
                )}
              </div>
            ))}
          {!loading && usePagination && pageCount > 1 && (
            <div className="w-full flex flex-row justify-end px-2 py-2">
              <Pagination
                totalPage={pageCount}
                onPageChange={(page) => {
                  if (onPageChange) {
                    onPageChange(page);
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
    </Component>
  );
}

export type { TableProps, HeaderProps, TableDataProps, SortProp };
export default Table;
