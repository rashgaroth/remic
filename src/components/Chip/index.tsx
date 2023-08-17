import React, { HTMLAttributes, ReactNode, useMemo, useState } from "react";
import clsxm from "../../utils/clsxm";
import useChipController from "./useChipController";

export type ChipProps = {
  text?: string;
  loading?: boolean;
  color?: "info" | "success" | "danger" | "warning" | string;
  outlined?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  variant?: "basic" | "status";
  clickable?: boolean;
  handleClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
} & HTMLAttributes<HTMLDivElement>;

function Chip(props: ChipProps) {
  const { getColor, getProps } = useChipController(props);

  const {
    text,
    loading,
    color,
    outlined,
    startIcon,
    endIcon,
    handleClick,
    clickable = false,
    variant = "basic",
    ...rest
  } = getProps();
  const [isClicked, setIsClicked] = useState(false);

  const computedChipColor = useMemo(() => {
    return getColor();
  }, [color, outlined]);

  const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (clickable && handleClick) {
      e.preventDefault();
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 150);
      handleClick(e);
    }
  };

  return (
    <div
      onClick={clickHandler}
      className={clsxm(
        "font-poppins font-extrabold cursor-default relative overflow-hidden transition-all delay-100",
        `flex w-max px-3.5 py-1 text-sm rounded-full items-center`,
        variant === "status" && "pl-2 pr-3",
        (startIcon || endIcon) && "px-1.5",
        clickable && "delay-0 duration-300 cursor-pointer shadow-md",
        isClicked && "hover:scale-105",
        computedChipColor.className,
        rest.className
      )}
      {...rest}
    >
      {startIcon ? startIcon : null}
      {variant === "status" && (
        <div
          className={clsxm(
            `${computedChipColor.accent}`,
            "mr-1 w-3 h-3 rounded-full"
          )}
        />
      )}
      <span className={clsxm((startIcon || endIcon) && "mx-1", "z-20")}>
        {text}
      </span>
      {endIcon ? endIcon : null}
    </div>
  );
}

export default Chip;
