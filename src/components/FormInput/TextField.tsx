/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from "react";
import clsxm from "../../utils/clsxm";
import { safeVoid } from "../../utils/common";
import Exclamation from "../../svgs/Exclamation";

export type FormatterInput = {
  type: "money" | "phone" | "number";
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
  onError?: (value: "max" | "required" | "min") => string;
};

export type TextFieldProps<T = HTMLInputElement> = {
  label?: string;
  fullWidth?: boolean;
  width?: number;
  rules?: Rules;
  // icons
  endIcon?: React.ReactNode;
  // formatter
  formatter?: FormatterInput;
  // error
  errorIcon?: React.ReactNode;
  error?: boolean;
  errormsg?: string;
  // success
  success?: boolean;
  successmsg?: string;
  successIcon?: React.ReactNode;
  // label
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  LabelComponent?: React.ReactNode;
  labelClassName?: React.ComponentProps<"label">["className"];
} & React.InputHTMLAttributes<T>;

function RenderErrorIcon({
  EndIcon,
  ErrorIcon,
  error,
  success,
  successIcon,
}: {
  EndIcon: React.ReactNode;
  ErrorIcon: React.ReactNode;
  error: boolean;
  success: boolean;
  successIcon: React.ReactNode;
}): React.ReactElement | null {
  return EndIcon && !error ? (
    <div>{EndIcon as React.ReactNode}</div>
  ) : success && successIcon ? (
    <div>{successIcon as React.ReactNode}</div>
  ) : ErrorIcon ? (
    <div>{ErrorIcon as React.ReactNode}</div>
  ) : (
    <Exclamation className="h-5 w-5 text-red-500" aria-hidden="true" />
  );
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(props, ref) {
    const {
      error = false,
      errormsg = "",
      className,
      id,
      label,
      fullWidth,
      width,
      LabelComponent,
      labelProps,
      labelClassName,
      endIcon,
      errorIcon,
      success,
      successmsg,
      successIcon,
      formatter,
      rules,
      ...rest
    } = props;

    const [tmpError, setTmpError] = React.useState(false);
    const [tmpErrMsg, setTmpErrMsg] = React.useState("");
    const [isFocus, setIsFocus] = React.useState(false);

    const onError = formatter?.onError;
    const rgx = formatter?.customRegex;
    const numReg = rgx || /^[0-9]*(\.|,)?[0-9]*$/;
    const separator = formatter?.separator || "-";
    const decimalLimit = formatter?.decimalLimit || 4;
    const execWhenChange = formatter?.execWhenChange;
    const type = formatter?.type;

    const getClasses = (): React.ComponentProps<"label">["className"] => {
      if (error || tmpError) {
        return "border-red-300 text-red-500 placeholder-red-300 focus:ring-red-500 ring-red-300";
      }
      if (success) {
        return "border-green-500 text-green-500 placeholder-green-500 focus:ring-green-500 ring-green-500";
      }
      return "border-gray-300 text-gray-700 placeholder-gray-300 focus:ring-gray-500 ring-gray-300";
    };

    const formatPhoneNumber = (
      value: string,
      execOnChange: (customVal?: string) => void
    ): string | undefined => {
      if (execWhenChange && value !== "") {
        if (!numReg.test(value[0])) {
          return;
        }
      } else {
        if (!numReg.test(value[0])) {
          onError?.(value);
          execOnChange();
          return;
        }
      }
      const regex = new RegExp(
        new RegExp("(\\d)(?=(\\d{" + decimalLimit + "})+(?!\\d))", "g")
      );
      const val = value
        .replace(/[^0-9\.]/g, "")
        .replace(/\.+$/, "")
        .replace(regex, `$1${separator}`);

      return val;
    };

    const formatMoney = (
      value: string,
      execOnChange: (customVal?: string) => void
    ): string | undefined => {
      const regex = /^[0-9]*(\.|,)?[0-9]*$/;
      if (execWhenChange && value !== "") {
        if (!regex.test(value[0])) {
          return;
        }
      } else {
        if (!regex.test(value[0])) {
          onError?.(value);
          execOnChange();
          return;
        }
      }
      let val = value.replace(/[^0-9\.]/g, "");
      val = val.replace(/\.+$/, "").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      if (val.split(".").length > 2) val = val.replace(/\.+$/, "");
      return val;
    };

    const onFormatterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      const execOnChange = (customValue?: string) => {
        if (rest?.onChange && safeVoid(rest?.onChange)) {
          rest?.onChange(
            customValue
              ? {
                  ...e,
                  target: {
                    ...e.target,
                    value: customValue,
                  },
                }
              : e
          );
        }
      };

      if (rgx) {
        const regex = rgx instanceof RegExp ? rgx : new RegExp(rgx);
        if (!regex.test(value)) {
          if (execWhenChange) {
            return onError?.(value);
          }
          return execOnChange();
        }
      }

      if (type === "money") {
        return execOnChange(formatMoney(value, execOnChange) as string);
      }

      if (type === "number") {
        const regex = rgx || /^[0-9]*$/;
        if (execWhenChange && value !== "") {
          if (!regex.test(value)) {
            return;
          }
        } else {
          if (!regex.test(value)) {
            onError?.(value);
            return execOnChange();
          }
        }
        return execOnChange(value);
      }

      if (type === "phone") {
        let val = value;
        val = formatPhoneNumber(value, execOnChange) as string;
        if (!val) {
          return;
        }
        return execOnChange(val);
      }

      return execOnChange();
    };

    React.useEffect(() => {
      if (rules && !isFocus) {
        if (rules.required) {
          if (rest.value === "") {
            setTmpError(true);
            if (rules.onError && safeVoid(rules.onError)) {
              setTmpErrMsg(
                rules.onError("required") || "This field is required"
              );
            }
            return;
          }
        }
        if (rules.minValue) {
          if (Number((rest.value as string).length) < Number(rules.minValue)) {
            setTmpError(true);
            if (rules.onError && safeVoid(rules.onError)) {
              setTmpErrMsg(
                rules.onError("min") || "Value can't be less than minValue"
              );
            }
            return;
          }
        }
        if (rules.maxValue) {
          if (Number((rest.value as string).length) > Number(rules.maxValue)) {
            setTmpError(true);
            if (rules.onError && safeVoid(rules.onError)) {
              setTmpErrMsg(
                rules.onError("max") || "Value can't be greater than maxValue"
              );
            }
            return;
          }
        }
      } else {
        setTmpError(false);
        setTmpErrMsg("");
      }
    }, [isFocus]);

    React.useEffect(() => {
      if (error) {
        setTmpError(true);
        setTmpErrMsg(errormsg);
      }
    }, [error, errormsg]);

    return (
      <div>
        {label &&
          (LabelComponent ? (
            LabelComponent
          ) : (
            <label
              htmlFor={id}
              className={clsxm(
                "block text-sm z-20 font-medium leading-6 text-gray-900",
                labelClassName
              )}
              {...labelProps}
            >
              {label}
            </label>
          ))}
        <div
          className={clsxm(
            "relative mt-0 rounded-md shadow-sm",
            fullWidth && "block w-full"
          )}
          style={{
            width: width ?? "auto",
          }}
        >
          {formatter &&
            formatter.type === "money" &&
            formatter.currencySymbol && (
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">
                  {formatter.currencySymbol}
                </span>
              </div>
            )}
          <input
            {...rest}
            ref={ref}
            onBlur={(e) => {
              setIsFocus(false);
              if (rest?.onBlur && safeVoid(rest?.onBlur)) {
                rest?.onBlur(e);
              }
            }}
            onFocus={(e) => {
              setIsFocus(true);
              if (rest?.onFocus && safeVoid(rest?.onFocus)) {
                rest?.onFocus(e);
              }
            }}
            className={clsxm(
              `px-2 rounded-md border-0 py-2 pr-10 z-20 ring-1 focus:ring-2 ring-inset block w-full focus:ring-inset sm:text-sm sm:leading-6`,
              "delay-100 duration-300 ease-in-out transition",
              getClasses(),
              className,
              formatter &&
                formatter.type === "money" &&
                formatter.currencySymbol &&
                "pl-9"
            )}
            onChange={(e) => {
              if (formatter && formatter.type) {
                onFormatterChange(e);
                return;
              }
              if (rest?.onChange && safeVoid(rest?.onChange)) {
                rest?.onChange(e);
              }
            }}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 z-50">
            {tmpError ? (
              <RenderErrorIcon
                EndIcon={endIcon}
                error={tmpError}
                ErrorIcon={errorIcon}
                success={success || false}
                successIcon={successIcon}
              />
            ) : success && successIcon ? (
              <RenderErrorIcon
                EndIcon={endIcon}
                error={tmpError}
                ErrorIcon={errorIcon}
                success={success}
                successIcon={successIcon}
              />
            ) : (
              endIcon
            )}
          </div>
        </div>
        {tmpErrMsg && tmpError && (
          <p className="mt-0 text-sm text-red-600" id={id}>
            {tmpErrMsg}
          </p>
        )}
        {!!(!error && success && successmsg) && (
          <p className="mt-0 text-sm text-green-600" id={id}>
            {successmsg}
          </p>
        )}
      </div>
    );
  }
);

export default TextField;
