import React, { useEffect, useRef, useState } from 'react';
import Input from '../Input';
import classNames from 'classnames';
import styles from './MultiDropdown.module.scss';
import arrowInput from 'assets/icons/arrow-input.svg';
import Text from 'components/Text';

export type Option = {
  id: string;
  title: string;
};

export type MultiDropdownProps = {
  className?: string;
  options: Option[];
  disabled?: boolean;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  disabled = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const multiDropdownRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleClickDocument = (event: MouseEvent) => {
      if (
        multiDropdownRef.current &&
        !multiDropdownRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener('click', handleClickDocument);

    return () => {
      document.removeEventListener('click', handleClickDocument);
    };
  }, []);

  const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    if (!disabled) {
      setIsVisible((prev) => !prev);

      if (isVisible) {
        event.currentTarget.blur();
      }
    }
  };

  return (
    <div
      className={classNames(styles['multi-dropdown__wrapper'], className)}
      ref={multiDropdownRef}
    >
      <Input
        onClick={handleInputClick}
        afterSlot={<img src={arrowInput} alt="arrow" />}
        disabled={disabled}
        ref={inputRef}
        placeholder="Filter"
      />
      <div
        className={classNames(styles['multi-dropdown'], {
          [styles['multi-dropdown--visible']]: isVisible && !disabled,
        })}
      >
        {options.map((option) => {
          return (
            <label
              className={classNames(styles['multi-dropdown__option'])}
              key={option.id}
            >
              <input
                type="checkbox"
                className={styles['multi-dropdown__option-checkbox']}
                name={'filters'}
                value={option.id}
              />
              <Text view="p-16">{option.title}</Text>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(MultiDropdown);
