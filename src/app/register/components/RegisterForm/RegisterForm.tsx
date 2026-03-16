'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import styles from './RegisterForm.module.scss';
import { CONFIRM_PASSWORD, EMAIL, PASSWORD } from '@/api/config/userConfig.api';
import { useUserStore } from '@/store';
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Loader from '@/components/Loader';
import { useRouter } from 'next/navigation';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_ALLOWED_REGEX = /^[a-zA-Z0-9./,!]+$/;
const PASSWORD_SPECIAL_REGEX = /[./,!]/;
const PASSWORD_DIGIT_REGEX = /[0-9]/;

function validateEmail(value: string): string {
  if (!value) return 'Email is required';
  if (!EMAIL_REGEX.test(value)) return 'Enter a valid email address';
  return '';
}

function validatePassword(value: string): string {
  if (!value) return 'Password is required';
  if (value.length < 8) return 'Password must be at least 8 characters';
  if (!PASSWORD_ALLOWED_REGEX.test(value))
    return 'Password must contain only Latin letters, digits, and symbols . / , !';
  if (!PASSWORD_SPECIAL_REGEX.test(value))
    return 'Password must contain at least one of the symbols: . / , !';
  if (!PASSWORD_DIGIT_REGEX.test(value))
    return 'Password must contain at least one digit';
  return '';
}

function validateConfirmPassword(password: string, confirm: string): string {
  if (!confirm) return 'Please confirm your password';
  if (password !== confirm) return 'Passwords do not match';
  return '';
}

const RegisterForm = () => {
  const { isLoading, registerLoad } = useUserStore();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' });

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setErrors((prev) => ({
      ...prev,
      password: validatePassword(value),
      confirmPassword: confirmPassword ? validateConfirmPassword(value, confirmPassword) : prev.confirmPassword,
    }));
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setErrors((prev) => ({ ...prev, confirmPassword: validateConfirmPassword(password, value) }));
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmError = validateConfirmPassword(password, confirmPassword);

    if (emailError || passwordError || confirmError) {
      setErrors({ email: emailError, password: passwordError, confirmPassword: confirmError });
      return;
    }

    const formData = new FormData(event.currentTarget);
    const isRegistered = await registerLoad(formData);

    if (isRegistered) {
      router.push('/');
    }
  };

  return (
    <form className={styles.registerForm} onSubmit={handleSubmit}>
      <div className={styles.registerFormInputs}>
        <Input
          placeholder="Email"
          name={EMAIL}
          type="email"
          value={email}
          onChange={handleEmailChange}
          error={errors.email}
        />
        <Input
          placeholder="Password"
          name={PASSWORD}
          type="password"
          value={password}
          onChange={handlePasswordChange}
          error={errors.password}
        />
        <Input
          placeholder="Confirm password"
          name={CONFIRM_PASSWORD}
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          error={errors.confirmPassword}
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
