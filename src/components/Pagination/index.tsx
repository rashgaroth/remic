import React, { useEffect } from "react";
import clsxm from "../../utils/clsxm";
import { ClassValue } from "clsx";

export type PaginationProps = {
  totalPage: number;
  onPageChange?: (page: number) => void;
  className?: ClassValue;
  boxClassName?: ClassValue;
  showCalculatedPage?: boolean;
};

export default function Pagination(props: PaginationProps) {
  const {
    totalPage,
    className = "",
    boxClassName = "",
    showCalculatedPage,
    onPageChange,
  } = props;

  const [currentPage, setCurrentPage] = React.useState(0);
  const [replacerPosition, setReplacerPosition] = React.useState(4); // 0 = left, 1 = right, 2 = disabled, 3 = center
  const [pageNumber, setPageNumber] = React.useState(0);

  const getRange = () =>
    totalPage > 5 ? (replacerPosition === 3 ? 3 : 4) : totalPage;
  const isOnRange = totalPage > 5;

  useEffect(() => {
    setCurrentPage(1);
    if (isOnRange) {
      setReplacerPosition(0);
    } else {
      setReplacerPosition(2);
    }
  }, [isOnRange]);

  React.useEffect(() => {
    if (
      onPageChange &&
      typeof onPageChange === "function" &&
      currentPage !== 0
    ) {
      onPageChange(currentPage);
    }
    if (isOnRange && pageNumber >= 4 && replacerPosition === 0) {
      setReplacerPosition(3);
    }
    if (isOnRange && totalPage - 3 === pageNumber && replacerPosition === 1) {
      setReplacerPosition(3);
    }
  }, [pageNumber]);

  React.useEffect(() => {
    if (isOnRange && currentPage + 2 === totalPage) {
      setReplacerPosition(1);
    }
    if (isOnRange && currentPage - 2 === 1) {
      setReplacerPosition(0);
    }
  }, [currentPage]);

  const calculatePageNummber = (index: number) => {
    let pageNum = 0;
    if (!isOnRange) {
      return index + 1;
    }
    if (replacerPosition === 0) {
      pageNum = index + 1;
    } else if (replacerPosition === 1) {
      pageNum = totalPage - 4 + index + 1;
    } else {
      pageNum = pageNumber - 1 + index;
    }

    return pageNum;
  };

  return totalPage === 0 || replacerPosition === 4 ? null : (
    <div className="flex flex-col space-y-1 text-sm items-end">
      {showCalculatedPage && (
        <p className="font-normal">
          page {currentPage} of {totalPage}
        </p>
      )}
      <div className={clsxm("flex flex-row space-x-2", className)}>
        {(replacerPosition === 1 || replacerPosition === 3) && (
          <div
            onClick={() => {
              setReplacerPosition(0);
              setCurrentPage(1);
              setPageNumber(1);
            }}
            className={clsxm(
              "w-8 h-8 border-gray-200 border rounded-md cursor-pointer hover:bg-gray-100 flex items-center justify-center",
              currentPage === 0 && "bg-gray-200 text-gray-900",
              boxClassName
            )}
          >
            {totalPage * 0 + 1}
          </div>
        )}
        {(replacerPosition === 1 || replacerPosition === 3) && (
          <div
            className={clsxm(
              "w-8 h-8 border-gray-200 border rounded-md cursor-pointer hover:bg-gray-100 flex items-center justify-center",
              boxClassName
            )}
          >
            ...
          </div>
        )}
        {Array(getRange())
          .fill(0)
          .map((_, index) => {
            const pageNum = calculatePageNummber(index);
            const active = currentPage === pageNum;
            return (
              <div
                key={index + 2}
                onClick={() => {
                  if (isOnRange) {
                    if (pageNumber === totalPage && replacerPosition === 3) {
                      return;
                    }
                    setPageNumber(pageNum);
                    setCurrentPage(pageNum);
                    return;
                  }
                  setPageNumber(pageNum);
                  setCurrentPage(pageNum);
                }}
                className={clsxm(
                  "w-8 h-8 border-gray-200 border rounded-md cursor-pointer hover:bg-gray-100 flex items-center justify-center",
                  active && "bg-gray-200 text-gray-900",
                  boxClassName
                )}
              >
                {pageNum}
              </div>
            );
          })}
        {(replacerPosition === 0 || replacerPosition === 3) && (
          <div
            className={clsxm(
              "w-8 h-8 border-gray-200 border rounded-md cursor-pointer hover:bg-gray-100 flex items-center justify-center",
              boxClassName
            )}
          >
            ...
          </div>
        )}
        {(replacerPosition === 0 || replacerPosition === 3) && (
          <div
            onClick={() => {
              setReplacerPosition(1);
              setCurrentPage(totalPage);
              setPageNumber(totalPage);
            }}
            className={clsxm(
              "w-8 h-8 border-gray-200 border rounded-md cursor-pointer hover:bg-gray-100 flex items-center justify-center",
              currentPage === totalPage && "bg-gray-200 text-gray-900",
              boxClassName
            )}
          >
            {totalPage}
          </div>
        )}
      </div>
    </div>
  );
}
