'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import styles from './LoginForm.module.scss';
import { EMAIL, PASSWORD } from '@/api/config/userConfig.api';
import { useUserStore } from '@/store';
import Loader from '@/components/Loader';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import Text from '@/components/Text';
import Link from 'next/link';
import routerData from '@/config/routerData';

const LoginForm = () => {
  const { isLoading, loginLoad } = useUserStore();
  const router = useRouter();

  const handleAction = async (formData: FormData) => {
    if (isLoading) return;

    const isLoggedIn = await loginLoad(formData);

    if (isLoggedIn) {
      router.push('/');
    }
  };

  return (
    <form action={handleAction} className={styles.loginForm}>
      <div className={styles.loginFormInputs}>
        <Input placeholder="Email" name={EMAIL} type="email" />
        <Input placeholder="Password" name={PASSWORD} type="password" />
      </div>
      <Button
        className={styles.loginFormButton}
        type="submit"
        disabled={isLoading}
      >
        Login
        {isLoading && <Loader className={styles.loginFormLoader} size="s" />}
      </Button>
      <Text view="p-20">
        Not registered yet?{' '}
        <Link className={styles.loginLinkToReg} href={routerData.register.href}>
          Sign up
        </Link>
      </Text>
    </form>
  );
};

export default observer(LoginForm);
