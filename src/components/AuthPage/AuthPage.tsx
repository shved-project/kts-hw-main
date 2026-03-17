import { ReactNode } from 'react';
import Container from '@/components/Container';
import styles from './AuthPage.module.scss';
import Logo from '../Logo';

type AuthPageProps = {
  children: ReactNode;
};

const AuthPage = ({ children }: AuthPageProps) => {
  return (
    <section>
      <Container className={styles.container}>
        <div className={styles.formWrapper}>
          <div className={styles.logo}>
            <Logo size="lg" />
          </div>
          {children}
        </div>
      </Container>
    </section>
  );
};

export default AuthPage;
