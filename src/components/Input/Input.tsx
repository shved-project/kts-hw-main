import React from 'react';
import styles from './Input.module.scss';
import classNames from 'classnames';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  // value: string;
  onChange: (value: string) => void;
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ onChange, afterSlot, className, ...rest }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    return (
      <div className={classNames(styles.input__wrapper, className)}>
        <input
          type="text"
          className={styles.input}
          onChange={handleChange}
          style={{ paddingRight: afterSlot ? '44px' : 'auto' }}
          {...rest}
        />
        {afterSlot && <div className={styles.input__icon}>{afterSlot}</div>}
      </div>
    );
  }
);

export default Input;
