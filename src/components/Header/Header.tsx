import Container from 'components/Container';
import styles from './Header.module.scss';
import { Link } from 'react-router';
import headerNav from 'config/headerNav';
import HeaderNavLink from './components/HeaderNavLink';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import UserLinks from './components/UserLinks';
import BurgerButton from './components/BurgerButton';

const Header = () => {
  const [isBurgerActive, setIsBurgerActive] = useState(false);

  const headerNavWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
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

  useEffect(() => {
    if (isBurgerActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isBurgerActive]);

  const handleBurgerClick = () => {
    setIsBurgerActive((prev) => !prev);
  };

  const handleLinkClick = () => {
    setIsBurgerActive(false);
  };

  return (
    <header className={styles.header}>
      <Container className={styles.header__container}>
        <div className={styles.header__content}>
          <Link to={'/'} onClick={handleLinkClick}>
            <img src="/images/logo.svg" alt="Logo" />
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
            onClick={handleBurgerClick}
          />
        </div>
      </Container>
    </header>
  );
};

export default Header;
