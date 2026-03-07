'use client';

import React from 'react';
import Container from '@/components/Container';
import styles from './Header.module.scss';
import headerNav from '@/config/headerNav';
import HeaderNavLink from './components/HeaderNavLink';
import classNames from 'classnames';
import UserLinks from './components/UserLinks';
import BurgerButton from './components/BurgerButton';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
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
    <header className={styles.header}>
      <Container className={styles.header__container}>
        <div className={styles.header__content}>
          <Link href={'/'} onClick={handleLinkClick}>
            <Image src="/images/logo.svg" alt="Logo" width={130} height={42} />
          </Link>
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
        </div>
      </Container>
    </header>
  );
};

export default Header;
