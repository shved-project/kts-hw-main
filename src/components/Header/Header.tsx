import Container from '@/components/Container';
import styles from './Header.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import BurgerMenu from './components/BurgerMenu';

const Header = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.header__container}>
        <div className={styles.header__content}>
          <Link href={'/'}>
            <Image src="/images/logo.svg" alt="Logo" width={130} height={42} />
          </Link>
          <BurgerMenu />
        </div>
      </Container>
    </header>
  );
};

export default Header;
