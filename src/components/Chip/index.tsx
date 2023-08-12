import React, { useMemo, useState } from 'react';
import clsxm from '../../utils/clsxm';
import { ChipProps, ShineAnimationProps } from '../../interfaces/component';
import useChipController from '../../hooks/useChipController';

function Chip({
  text,
  loading,
  color,
  outlined,
  startIcon,
  endIcon,
  handleClick,
  clickable = false,
  variant = 'basic',
  ...rest
}: ChipProps) {
  const [isClicked, setIsClicked] = useState(false);

  const computedChipColor = useMemo(() => {
    return useChipController(color, outlined);
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
        'font-poppins font-extrabold cursor-default relative overflow-hidden transition-all delay-100',
        `flex w-max px-3.5 py-1 text-sm rounded-full items-center`,
        variant === 'status' && 'pl-2 pr-3',
        (startIcon || endIcon) && 'px-1.5',
        clickable && 'delay-0 duration-300 cursor-pointer shadow-md',
        isClicked && 'hover:scale-105',
        computedChipColor.className,
        rest.className
      )}
    >
      <ShineAnimation isClicked={isClicked} color={computedChipColor} />
      {startIcon ? startIcon : null}
      {variant === 'status' && (
        <div
          className={clsxm(
            `${computedChipColor.accent}`,
            'mr-1 w-3 h-3 rounded-full'
          )}
        />
      )}
      <span className={clsxm((startIcon || endIcon) && 'mx-1', 'z-20')}>
        {text}
      </span>
      {endIcon ? endIcon : null}
    </div>
  );
}

const ShineAnimation = ({ color, isClicked }: ShineAnimationProps) => {
  return (
    <div
      className={clsxm(
        color.accent,
        'absolute z-10 w-14 h-14 rounded-full transition-all -translate-x-10',
        isClicked ? 'translate-x-10 opacity-50 blur-lg' : 'opacity-0'
      )}
    ></div>
  );
};

export default Chip;
