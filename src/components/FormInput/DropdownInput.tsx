import * as React from "react";
import { TextField, Loader } from "../../components";
import {
  useSpring,
  animated,
  useTransition,
  useSpringRef,
  config,
  useChain,
} from "@react-spring/web";
import clsxm from "../../utils/clsxm";
import { safeVoid } from "../../utils/common";
import Close from "../../svgs/Close";
import { ClassValue } from "clsx";
import { TextFieldProps } from "./TextField";

export type AsyncDropdownData = {
  label: string;
  value: any;
};

export type DropdownInputProps = {
  onSearch?: (value: React.ChangeEvent<HTMLInputElement>) => void;
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
  CloseIcon?: React.ReactNode;
  disableType?: boolean;
  textFieldProps?: TextFieldProps;
  label?: string;
  placeholder?: string;
  width?: number;
  dropdownClassName?: ClassValue;
  className?: ClassValue;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function DropdownInput(props: DropdownInputProps) {
  const {
    onSearch,
    loaderColor,
    loading,
    data = [],
    onChange,
    onOpen,
    onClose,
    initValue,
    dropdownValue,
    CloseIcon,
    disableType,
    ...rest
  } = props;
  const [isFocus, setIsFocus] = React.useState(false);
  const [currentValue, setCurrentValue] = React.useState("");
  const [listCurrentTarget, setListCurrentTarget] = React.useState<
    (EventTarget & HTMLDivElement) | null
  >(null);

  const transApi = useSpringRef();
  const springApi = useSpringRef();

  const textFieldRef = React.useRef<HTMLInputElement>(null);
  const dropdownDivRef = React.useRef<HTMLDivElement>(null);
  const dropdownListRef = React.useRef<HTMLDivElement>(null);

  const { height, ...springRest } = useSpring({
    ref: springApi,
    config: config.gentle,
    from: {
      height: "0%",
      opacity: 0,
    },
    to: {
      height: isFocus ? "100%" : "0%",
      opacity: isFocus ? 1 : 0,
    },
  });

  const dropdownTransitionValues = useTransition(isFocus ? data : [], {
    ref: transApi,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  useChain(isFocus ? [springApi, transApi] : [transApi, springApi], [
    0,
    isFocus ? 0.1 : 0.6,
  ]);

  const getEndIcon = () => {
    if (loading) {
      return <Loader color={loaderColor} />;
    }

    if (!loading && isFocus) {
      if (CloseIcon) {
        return (
          <div
            onClick={() => {
              setCurrentValue("");
              if (onChange && safeVoid(onChange)) {
                onChange(null);
              }
            }}
          >
            {CloseIcon}
          </div>
        );
      }
      return (
        <Close
          className="inline mr-1 w-4 h-4 text-gray-400 cursor-pointer"
          onClick={() => setIsFocus(false)}
        />
      );
    }
    if (!loading && !isFocus && currentValue !== "") {
      if (CloseIcon) {
        return (
          <div
            onClick={() => {
              setCurrentValue("");
              if (onChange && safeVoid(onChange)) {
                onChange(null);
              }
            }}
          >
            {CloseIcon}
          </div>
        );
      }
      return (
        <Close
          className="inline mr-1 w-4 h-4 text-gray-400 cursor-pointer"
          onClick={() => {
            setCurrentValue("");
            if (onChange && safeVoid(onChange)) {
              onChange(null);
            }
          }}
        />
      );
    }
    return null;
  };

  React.useEffect(() => {
    if (dropdownValue) {
      if (!dropdownValue.label) {
        throw new Error("Dropdown value must have label property");
      }
      setCurrentValue(dropdownValue.label);
    }
  }, [dropdownValue]);

  return (
    <div className="flex flex-col z-20">
      <TextField
        ref={textFieldRef}
        onFocus={(e) => {
          setListCurrentTarget(e.currentTarget);
          if (onOpen && safeVoid(onOpen)) {
            onOpen();
          }
          setIsFocus(true);
        }}
        onChange={(e) => {
          if (disableType && disableType === true) {
            return;
          }
          setCurrentValue(e.target.value);
          if (onSearch && safeVoid(onSearch)) {
            onSearch(e);
          }
        }}
        onBlur={(e) => {
          if (onClose && safeVoid(onClose)) {
            onClose(e);
          }
          if (isFocus && listCurrentTarget === e.currentTarget) {
            setIsFocus(false);
          }
        }}
        className={clsxm("px-5", rest.className && rest.className)}
        role="combobox"
        spellCheck={false}
        endIcon={getEndIcon()}
        value={currentValue}
        placeholder={rest.placeholder ?? ""}
        label={rest.label ?? ""}
        {...rest.textFieldProps}
      />
      <animated.div
        ref={dropdownDivRef}
        className={clsxm(
          "w-full mt-1 flex flex-col space-y-1 rounded-md z-50 shadow-lg relative overflow-hidden overflow-y-scroll",
          "transition-all delay-150 duration-300 ease-in-out",
          "bg-white",
          rest.dropdownClassName
        )}
        style={{
          ...springRest,
          height,
          width: "auto",
          maxHeight: 290,
        }}
      >
        {isFocus &&
          dropdownTransitionValues((style, item, _, idx) => (
            <animated.div
              ref={dropdownListRef}
              style={{ ...style }}
              onMouseDown={(e) => {
                setCurrentValue(item.label);
                setListCurrentTarget(e.currentTarget);
                if (onChange && safeVoid(onChange)) {
                  onChange(item);
                }
                setIsFocus(false);
              }}
              onClick={(e) => {
                if (onClose && safeVoid(onClose)) {
                  onClose(e);
                }
              }}
              className={clsxm(
                "text-sm text-gray-800 hover:bg-gray-100 z-40 cursor-pointer px-5 py-2 divide-y",
                idx === data.length - 1 && "rounded-b-md",
                idx === 0 && "rounded-t-md"
              )}
              key={idx}
            >
              <p>{item.label}</p>
            </animated.div>
          ))}
      </animated.div>
    </div>
  );
}
