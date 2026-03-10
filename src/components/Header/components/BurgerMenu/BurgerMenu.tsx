'use client';

import React from 'react';
import headerNav from '@/config/headerNav';
import classNames from 'classnames';
import styles from '../../Header.module.scss';
import HeaderNavLink from '../HeaderNavLink';
import UserLinks from '../UserLinks';
import BurgerButton from '../BurgerButton';

const BurgerMenu = () => {
  const [isBurgerActive, setIsBurgerActive] = React.useState(false);

  const headerNavWrapperRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handleClickDocument = (event: MouseEvent) => {
      if (
        headerNavWrapperRef.current &&
        headerNavWrapperRef.current === event.target
      ) {
        setIsBurgerActive(false);
      }
    };

    document.addEventListener('click', handleClickDocument);

    return () => {
      document.removeEventListener('click', handleClickDocument);
    };
  }, []);

  const handleLinkClick = () => {
    setIsBurgerActive(false);
  };

  return (
    <>
      <div
        className={classNames(styles['header__nav-wrapper'], {
          [styles['header__nav-wrapper--active']]: isBurgerActive,
        })}
        ref={headerNavWrapperRef}
      >
        <div className={styles['header__nav-bg-mobile']}>
          <nav className={styles.header__nav}>
            <ul className={styles['header__nav-list']}>
              {headerNav.map((link) => (
                <HeaderNavLink
                  link={link}
                  key={link.href}
                  onClick={handleLinkClick}
                />
              ))}
            </ul>
          </nav>
          <UserLinks className={styles['header__user-mobile']} />
        </div>
      </div>
      <UserLinks className={styles['header__user-desktop']} />
      <BurgerButton
        isBurgerActive={isBurgerActive}
        setIsBurgerActive={setIsBurgerActive}
      />
    </>
  );
};

export default BurgerMenu;
