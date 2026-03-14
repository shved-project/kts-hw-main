import Container from '@/components/Container';
import RegisterForm from './components/RegisterForm';
import styles from './Register.module.scss';
import Text from '@/components/Text';

const Register = () => {
  return (
    <section>
      <Container className={styles.registerContainer}>
        <div className={styles.registerFormWrapper}>
          <Text tag="h1" view="title">
            Register
          </Text>
          <div className={styles.registerFormBlock}>
            <RegisterForm />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Register;
