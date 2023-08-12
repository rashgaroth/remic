import * as React from "react";
import { CheckboxProps } from "../../interfaces/component";
import { animated, useSpring } from "@react-spring/web";
import clsxm from "../../utils/clsxm";
import { safeVal } from "@remic/utils/common";

function CheckedIcon({
  isChecked,
  className,
  disabled,
  color,
}: {
  isChecked: boolean;
  className?: string;
  disabled?: boolean;
  color?: `#${string}`;
}) {
  const [checkmarkLength, setCheckmarkLength] = React.useState<number | null>(
    null
  );
  const checkboxAnimationStyle = useSpring({
    backgroundColor: isChecked
      ? disabled
        ? "#d1d5db"
        : safeVal(color)
        ? color
        : "#262626"
      : "#fff",
    borderColor: isChecked
      ? disabled
        ? "#d1d5db"
        : safeVal(color)
        ? color
        : "#262626"
      : "#ddd",
  });
  const checkmarkAnimationStyle = useSpring({
    x: isChecked ? 0 : checkmarkLength || 0,
  });

  return (
    <animated.svg
      className={clsxm(
        `checkbox ${isChecked ? "checkbox--active" : ""} rounded-md`,
        className
      )}
      aria-hidden="true"
      viewBox="0 0 15 11"
      fill="none"
      style={checkboxAnimationStyle}
    >
      <animated.path
        d="M1 4.5L5 9L14 1"
        strokeWidth="1"
        strokeDasharray={checkmarkLength as number}
        strokeDashoffset={checkmarkAnimationStyle.x}
        ref={(ref) => {
          if (ref) {
            setCheckmarkLength(ref.getTotalLength());
          }
        }}
        stroke={isChecked ? "#fff" : "none"} // only show the checkmark when `isCheck` is `true`
      />
    </animated.svg>
  );
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function (
  props: CheckboxProps,
  ref
) {
  const [isChecked, setIsChecked] = React.useState(false);

  React.useEffect(() => {
    setIsChecked(props.checked || false);
  }, [props.checked]);

  return (
    <label id={props.id} htmlFor={props.name}>
      <input
        id={props.id}
        ref={ref}
        name={props.name}
        type="checkbox"
        checked={isChecked}
        disabled={props.disabled}
        onChange={(ev) => {
          setIsChecked(!isChecked);
          if (!!props.onChange) {
            props.onChange(ev, !isChecked);
          }
        }}
      />
      <CheckedIcon
        isChecked={isChecked}
        className={props.className}
        disabled={props.disabled}
        color={props.color}
      />
      {props.label}
    </label>
  );
});

export default Checkbox;
