import Container from '@/components/Container';
import styles from './Header.module.scss';
import Link from 'next/link';
import BurgerMenu from './components/BurgerMenu';
import Logo from '@/components/Logo';

const Header = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.header__container}>
        <div className={styles.header__content}>
          <Link href={'/'} aria-label="Home">
            <Logo />
          </Link>
          <BurgerMenu />
        </div>
      </Container>
    </header>
  );
};

export default Header;
