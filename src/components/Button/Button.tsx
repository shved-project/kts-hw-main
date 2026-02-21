import React from 'react';
import styles from './Button.module.scss';
import Loader from '../Loader';
import classNames from 'classnames';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  disabled = false,
  className,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      className={classNames(
        styles.button,
        {
          [styles['button--disabled']]: disabled,
        },
        className
      )}
      disabled={isDisabled}
      {...rest}
    >
      {loading && <Loader size="s" className={styles['button-loader']} />}
      {children}
    </button>
  );
};

export default Button;
