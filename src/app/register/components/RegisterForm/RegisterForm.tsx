'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import styles from './RegisterForm.module.scss';
import { EMAIL, PASSWORD, USERNAME } from '@/api/config/userConfig.api';
import { useUserStore } from '@/store';
import React from 'react';
import { observer } from 'mobx-react-lite';
import Loader from '@/components/Loader';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const { isLoading, registerLoad } = useUserStore();

  const router = useRouter();

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const isRegistered = await registerLoad(formData);

    if (isRegistered) {
      router.push('/');
    }
  };

  return (
    <form className={styles.registerForm} onSubmit={handleSubmit}>
      <div className={styles.registerFormInputs}>
        <Input placeholder="Name" name={USERNAME} type="text" />
        <Input placeholder="Email" name={EMAIL} type="email" />
        <Input placeholder="Password" name={PASSWORD} type="password" />
      </div>
      <Button
        className={styles.RegisterFormButton}
        type="submit"
        disabled={isLoading}
      >
        Register
        {isLoading && <Loader className={styles.RegisterFormLoader} size="s" />}
      </Button>
    </form>
  );
};

export default observer(RegisterForm);
