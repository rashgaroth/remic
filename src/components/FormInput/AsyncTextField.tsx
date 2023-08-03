import * as React from 'react';
import TextField from './TextField';
import { AsyncTextFieldProps } from '../../interfaces/component';
import Loader from '../Loader';
import { useSpring, animated } from '@react-spring/web';
import clsxm from '../../utils/clsxm';
import { safeFunction } from '../../utils/common';

export default function AsyncTextField(props: AsyncTextFieldProps) {
  const {
    onSearch,
    loaderColor,
    loading,
    data,
    onChange,
    onOpen,
    onClose,
    initValue,
    dropdownValue,
    ...rest
  } = props;
  const [isFocus, setIsFocus] = React.useState(true);
  const [currentValue, setCurrentValue] = React.useState('');

  const dropdownHeight = 'auto';
  const springProps = useSpring({
    height: isFocus ? dropdownHeight : 0,
  });

  React.useEffect(() => {
    if (dropdownValue) {
      if (!dropdownValue.label) {
        throw new Error('Dropdown value must have label property');
      }
      setCurrentValue(dropdownValue.label);
    }
  }, [dropdownValue]);

  console.log(springProps.height.get(), '@height');

  return (
    <div className="flex flex-col">
      <TextField
        {...rest}
        onFocus={() => {
          if (onOpen && safeFunction(onOpen)) {
            onOpen();
          }
          setIsFocus(true);
        }}
        onChange={(e) => {
          if (onSearch && safeFunction(onSearch)) {
            onSearch(e);
          }
        }}
        endIcon={loading && <Loader color={loaderColor} />}
        value={currentValue}
      />
      <animated.div
        className="w-full mt-1 flex flex-col space-y-1 rounded-md shadow-lg"
        style={{ width: rest.width ?? 'auto', ...springProps }}
      >
        {!loading &&
          isFocus &&
          data &&
          data.length > 0 &&
          data.map((item, idx) => (
            <div
              onClick={() => {
                if (onChange && safeFunction(onChange)) {
                  onChange(item);
                }
                setIsFocus(false);
              }}
              className={clsxm(
                'text-sm text-gray-800 hover:bg-gray-100 z-50 cursor-pointer px-5 py-2 divide-y',
                idx === data.length - 1 && 'rounded-b-md',
                idx === 0 && 'rounded-t-md'
              )}
              key={idx}
            >
              <p>{item.label}</p>
            </div>
          ))}
      </animated.div>
    </div>
  );
}
