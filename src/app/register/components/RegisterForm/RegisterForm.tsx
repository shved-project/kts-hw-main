'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import styles from './RegisterForm.module.scss';
import { CONFIRM_PASSWORD, EMAIL, PASSWORD } from '@/api/config/userConfig.api';
import { useUserStore } from '@/store';
import { useLocalStore } from '@/store/hooks';
import { RegisterFormStore } from '@/store/locals';
import React from 'react';
import { observer } from 'mobx-react-lite';
import Loader from '@/components/Loader';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const { isLoading, registerLoad } = useUserStore();
  const router = useRouter();
  const formStore = useLocalStore(() => new RegisterFormStore());

  const handleAction = async (formData: FormData) => {
    if (!formStore.validateAll()) return;

    const isRegistered = await registerLoad(formData);

    if (isRegistered) {
      router.push('/');
    }
  };

  return (
    <form action={handleAction} className={styles.registerForm}>
      <div className={styles.registerFormInputs}>
        <Input
          placeholder="Email"
          name={EMAIL}
          type="email"
          value={formStore.email}
          onChange={formStore.setEmail}
          error={formStore.errors.email}
        />
        <Input
          placeholder="Password"
          name={PASSWORD}
          type="password"
          value={formStore.password}
          onChange={formStore.setPassword}
          error={formStore.errors.password}
        />
        <Input
          placeholder="Confirm password"
          name={CONFIRM_PASSWORD}
          type="password"
          value={formStore.confirmPassword}
          onChange={formStore.setConfirmPassword}
          error={formStore.errors.confirmPassword}
        />
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
