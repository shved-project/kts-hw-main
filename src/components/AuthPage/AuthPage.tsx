import { ReactNode } from 'react';
import Container from '@/components/Container';
import styles from './AuthPage.module.scss';
import Logo from '../Logo';
import Link from 'next/link';

type AuthPageProps = {
  children: ReactNode;
};

const AuthPage = ({ children }: AuthPageProps) => {
  return (
    <section>
      <Container className={styles.container}>
        <div className={styles.formWrapper}>
          <div className={styles.logo}>
            <Link href={'/'}>
              <Logo size="lg" />
            </Link>
          </div>
          {children}
        </div>
      </Container>
    </section>
  );
};

export default AuthPage;
