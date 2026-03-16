import { ReactNode } from 'react';
import Container from '@/components/Container';
import Text from '@/components/Text';
import styles from './AuthPage.module.scss';

type AuthPageProps = {
  title: string;
  children: ReactNode;
};

const AuthPage = ({ title, children }: AuthPageProps) => {
  return (
    <section>
      <Container className={styles.container}>
        <div className={styles.formWrapper}>
          <Text tag="h1" view="title">
            {title}
          </Text>
          {children}
        </div>
      </Container>
    </section>
  );
};

export default AuthPage;
