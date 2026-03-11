'use client';

import React from 'react';
import { useThemeStore } from '@/store';
import { observer } from 'mobx-react-lite';
import styles from '../../Header.module.scss';
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
      className={styles.header__toggle_theme_button}
      onClick={toggle}
      aria-label="Toggle theme"
    >
      <div className={styles.header__toggle_theme_wrapper}>
        <div
          className={classNames(styles.header__toggle_theme_thumb, {
            [styles['header__toggle_theme_thumb--active']]: isLightTheme,
          })}
        >
          <Image
            className={styles.header__toggle_theme_icon}
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
