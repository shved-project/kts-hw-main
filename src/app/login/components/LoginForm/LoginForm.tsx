'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import styles from './LoginForm.module.scss';
import { EMAIL, PASSWORD } from '@/api/config/userConfig.api';
import { useUserStore } from '@/store';
import React from 'react';
import Loader from '@/components/Loader';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';

const LoginForm = () => {
  const { isLoading, loginLoad } = useUserStore();
  const router = useRouter();

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading) return;

    const formData = new FormData(event.currentTarget);
    const isLoggedIn = await loginLoad(formData);

    if (isLoggedIn) {
      router.push('/');
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
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
    </form>
  );
};

export default observer(LoginForm);
