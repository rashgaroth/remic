import * as React from 'react';
import TextField from './TextField';
import { AsyncTextFieldProps } from '../../interfaces/component';
import Loader from '../Loader';
import {
  useSpring,
  animated,
  useTransition,
  useSpringRef,
  config,
  useChain,
} from '@react-spring/web';
import clsxm from '../../utils/clsxm';
import { safeFunction } from '../../utils/common';
import Close from '../../svgs/Close';

export default function AsyncTextField(props: AsyncTextFieldProps) {
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
    ...rest
  } = props;
  const [isFocus, setIsFocus] = React.useState(false);
  const [currentValue, setCurrentValue] = React.useState('');
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
    config: config.slow,
    from: {
      height: '0%',
    },
    to: {
      height: isFocus ? '100%' : '0%',
    },
  });

  const dropdownTransitionValues = useTransition(isFocus ? data : [], {
    ref: transApi,
    trail: 400 / data.length,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  useChain(isFocus ? [springApi, transApi] : [transApi, springApi], [
    0,
    isFocus ? 0.1 : 0.6,
  ]);

  React.useEffect(() => {
    if (dropdownValue) {
      if (!dropdownValue.label) {
        throw new Error('Dropdown value must have label property');
      }
      setCurrentValue(dropdownValue.label);
    }
  }, [dropdownValue]);

  const getEndIcon = () => {
    if (loading) {
      return <Loader color={loaderColor} />;
    }

    if (!loading && isFocus) {
      if (CloseIcon) {
        return (
          <div
            onClick={() => {
              setCurrentValue('');
              if (onChange && safeFunction(onChange)) {
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
    if (!loading && !isFocus && currentValue !== '') {
      if (CloseIcon) {
        return (
          <div
            onClick={() => {
              setCurrentValue('');
              if (onChange && safeFunction(onChange)) {
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
            setCurrentValue('');
            if (onChange && safeFunction(onChange)) {
              onChange(null);
            }
          }}
        />
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col z-20">
      <TextField
        {...rest}
        ref={textFieldRef}
        onFocus={(e) => {
          setListCurrentTarget(e.currentTarget);
          if (onOpen && safeFunction(onOpen)) {
            onOpen();
          }
          setIsFocus(true);
        }}
        onChange={(e) => {
          setCurrentValue(e.target.value);
          if (onSearch && safeFunction(onSearch)) {
            onSearch(e);
          }
        }}
        onBlur={(e) => {
          if (onClose && safeFunction(onClose)) {
            onClose(e);
          }
          if (isFocus && listCurrentTarget === e.currentTarget) {
            setIsFocus(false);
          }
        }}
        className="px-5"
        role="combobox"
        spellCheck={false}
        endIcon={getEndIcon()}
        value={currentValue}
      />
      <animated.div
        ref={dropdownDivRef}
        className={clsxm(
          'w-full mt-1 flex flex-col space-y-1 rounded-md z-50 shadow-lg relative overflow-hidden overflow-y-scroll',
          'transition-all delay-150 duration-300 ease-in-out'
        )}
        style={{
          ...springRest,
          height,
          width: rest.width ?? 'auto',
          maxHeight: 300,
        }}
      >
        {isFocus &&
          dropdownTransitionValues((style, item, _, idx) => (
            <animated.div
              ref={dropdownListRef}
              style={{ ...style }}
              onMouseDown={(e) => {
                setListCurrentTarget(e.currentTarget);
                if (onChange && safeFunction(onChange)) {
                  onChange(item);
                }
                setIsFocus(false);
              }}
              onClick={(e) => {
                if (onClose && safeFunction(onClose)) {
                  onClose(e);
                }
              }}
              className={clsxm(
                'text-sm text-gray-800 hover:bg-gray-100 z-40 cursor-pointer px-5 py-2 divide-y',
                idx === data.length - 1 && 'rounded-b-md',
                idx === 0 && 'rounded-t-md'
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
