import { action, computed, makeObservable, observable } from 'mobx';
import type { ILocalStore } from '@/store/interfaces';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_ALLOWED_REGEX = /^[a-zA-Z0-9./,!]+$/;
const PASSWORD_SPECIAL_REGEX = /[./,!]/;
const PASSWORD_DIGIT_REGEX = /[0-9]/;

type PrivateFields = '_email' | '_password' | '_confirmPassword' | '_errors';

export class RegisterFormStore implements ILocalStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _email: observable,
      _password: observable,
      _confirmPassword: observable,
      _errors: observable,
      email: computed,
      password: computed,
      confirmPassword: computed,
      errors: computed,
      isValid: computed,
      setEmail: action.bound,
      setPassword: action.bound,
      setConfirmPassword: action.bound,
      validateAll: action.bound,
      destroy: action.bound,
    });
  }

  private _email: string = '';
  private _password: string = '';
  private _confirmPassword: string = '';
  private _errors = { email: '', password: '', confirmPassword: '' };

  get email(): string {
    return this._email;
  }
  get password(): string {
    return this._password;
  }
  get confirmPassword(): string {
    return this._confirmPassword;
  }
  get errors() {
    return this._errors;
  }
  get isValid(): boolean {
    return !this._errors.email && !this._errors.password && !this._errors.confirmPassword;
  }

  private validateEmail(): string {
    if (!this._email) return 'Email is required';
    if (!EMAIL_REGEX.test(this._email)) return 'Enter a valid email address';
    return '';
  }

  private validatePassword(): string {
    if (!this._password) return 'Password is required';
    if (this._password.length < 8) return 'Password must be at least 8 characters';
    if (!PASSWORD_ALLOWED_REGEX.test(this._password))
      return 'Password must contain only Latin letters, digits, and symbols . / , !';
    if (!PASSWORD_SPECIAL_REGEX.test(this._password))
      return 'Password must contain at least one of the symbols: . / , !';
    if (!PASSWORD_DIGIT_REGEX.test(this._password))
      return 'Password must contain at least one digit';
    return '';
  }

  private validateConfirmPassword(): string {
    if (!this._confirmPassword) return 'Please confirm your password';
    if (this._password !== this._confirmPassword) return 'Passwords do not match';
    return '';
  }

  setEmail(value: string): void {
    this._email = value;
    this._errors = { ...this._errors, email: this.validateEmail() };
  }

  setPassword(value: string): void {
    this._password = value;
    this._errors = {
      ...this._errors,
      password: this.validatePassword(),
      confirmPassword: this._confirmPassword
        ? this.validateConfirmPassword()
        : this._errors.confirmPassword,
    };
  }

  setConfirmPassword(value: string): void {
    this._confirmPassword = value;
    this._errors = { ...this._errors, confirmPassword: this.validateConfirmPassword() };
  }

  validateAll(): boolean {
    const emailError = this.validateEmail();
    const passwordError = this.validatePassword();
    const confirmError = this.validateConfirmPassword();
    this._errors = { email: emailError, password: passwordError, confirmPassword: confirmError };
    return !emailError && !passwordError && !confirmError;
  }

  destroy(): void {
    this._email = '';
    this._password = '';
    this._confirmPassword = '';
    this._errors = { email: '', password: '', confirmPassword: '' };
  }
}
