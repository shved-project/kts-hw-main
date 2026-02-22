import type { ReactNode } from 'react';
import styles from './Container.module.scss';
import classNames from 'classnames';

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={classNames(styles.container, className)}>{children}</div>
  );
};

export default Container;
