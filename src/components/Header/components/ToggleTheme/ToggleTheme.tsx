'use client';

import React from 'react';
import { useThemeStore } from '@/store';
import { observer } from 'mobx-react-lite';
import styles from './ToggleTheme.module.scss';
import Image from 'next/image';
import lightThemeIcon from '@/assets/icons/light-theme.svg';
import darkThemeIcon from '@/assets/icons/dark-theme.svg';
import classNames from 'classnames';

const ToggleTheme = () => {
  const { theme, init, toggle } = useThemeStore();

  React.useEffect(() => {
    init();
  }, [init]);

  const isLightTheme = React.useMemo(() => theme === 'light', [theme]);

  return (
    <button
      className={styles.button}
      onClick={toggle}
      aria-label="Toggle theme"
    >
      <div className={styles.wrapper}>
        <div
          className={classNames(styles.thumb, {
            [styles['thumb--active']]: isLightTheme,
          })}
        >
          <Image
            className={styles.icon}
            src={isLightTheme ? darkThemeIcon : lightThemeIcon}
            alt="toggle-theme"
            width={23}
            height={23}
          />
        </div>
      </div>
    </button>
  );
};

export default observer(ToggleTheme);
