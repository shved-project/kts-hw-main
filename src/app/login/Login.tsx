import Container from '@/components/Container';
import LoginForm from './components/LoginForm';
import styles from './Login.module.scss';
import Text from '@/components/Text';

const Login = () => {
  return (
    <section>
      <Container className={styles.loginContainer}>
        <div className={styles.loginFormWrapper}>
          <Text tag="h1" view="title">
            Login
          </Text>
          <div className={styles.loginFormBlock}>
            <LoginForm />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Login;
