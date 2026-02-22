import * as React from 'react';
import classNames from 'classnames';
import styles from './Text.module.scss';

export type TextProps = {
  className?: string;
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  weight?: 'normal' | 'medium' | 'semiBold' | 'bold';
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent';
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({
  className,
  view = 'p-14',
  tag = 'p',
  weight,
  children,
  color,
  maxLines,
}) => {
  const Component = tag;

  return (
    <Component
      className={classNames(
        styles.text,
        styles[`text_view_${view}`],
        weight && styles[`text_weight_${weight}`],
        color && styles[`text_color_${color}`],
        maxLines && styles.text_clamp,
        className
      )}
      style={maxLines ? { WebkitLineClamp: maxLines } : undefined}
    >
      {children}
    </Component>
  );
};

export default Text;
