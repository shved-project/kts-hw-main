import Container from 'components/Container';
import styles from './Header.module.scss';
import { Link } from 'react-router';
import routerData from 'config/routerData';
import bagIcon from 'assets/icons/bag.svg';
import userIcon from 'assets/icons/user.svg';
import UserLink from './components/UserLink';
import headerNav from 'config/headerNav';
import HeaderNavLink from './components/HeaderNavLink';

const Header = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.header__container}>
        <div className={styles.header__content}>
          <Link to={'/'}>
            <img src="/images/logo.svg" alt="Logo" />
          </Link>
          <nav className={styles.header__nav}>
            <ul className={styles['header__nav-list']}>
              {headerNav.map((link) => (
                <HeaderNavLink link={link} key={link.href} />
              ))}
            </ul>
          </nav>
          <div className={styles.header__user}>
            <UserLink
              href={routerData.cart.href}
              image={bagIcon}
              alt="Cart"
              aria-label="Cart"
            />
            <UserLink
              href={routerData.profile.href}
              image={userIcon}
              alt="Profile"
              aria-label="Profile"
            />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
