'use client';

import React from 'react';
import headerNav from '@/config/headerNav';
import classNames from 'classnames';
import styles from './BurgerMenu.module.scss';
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
        className={classNames(styles.navWrapper, {
          [styles['navWrapper--active']]: isBurgerActive,
        })}
        ref={headerNavWrapperRef}
      >
        <div className={styles.navBgMobile}>
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              {headerNav.map((link) => (
                <HeaderNavLink
                  link={link}
                  key={link.href}
                  onClick={handleLinkClick}
                />
              ))}
            </ul>
          </nav>
          <UserLinks className={styles.userMobile} />
        </div>
      </div>
      <UserLinks className={styles.userDesktop} />
      <BurgerButton
        isBurgerActive={isBurgerActive}
        setIsBurgerActive={setIsBurgerActive}
      />
    </>
  );
};

export default BurgerMenu;
