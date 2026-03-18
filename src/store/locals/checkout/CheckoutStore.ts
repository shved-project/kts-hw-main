import { action, computed, makeObservable, observable } from 'mobx';
import type { ILocalStore } from '@/store/interfaces';

export type PaymentMethod = 'delivery' | 'card';

type CheckoutErrors = {
  name: string;
  address: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
};

type PrivateFields =
  | '_name'
  | '_address'
  | '_paymentMethod'
  | '_cardNumber'
  | '_cardExpiry'
  | '_cardCvv'
  | '_errors';

export class CheckoutStore implements ILocalStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _name: observable,
      _address: observable,
      _paymentMethod: observable,
      _cardNumber: observable,
      _cardExpiry: observable,
      _cardCvv: observable,
      _errors: observable,
      name: computed,
      address: computed,
      paymentMethod: computed,
      cardNumber: computed,
      cardExpiry: computed,
      cardCvv: computed,
      errors: computed,
      isValid: computed,
      isFilled: computed,
      setName: action.bound,
      setAddress: action.bound,
      setPaymentMethod: action.bound,
      setCardNumber: action.bound,
      setCardExpiry: action.bound,
      setCardCvv: action.bound,
      validateAll: action.bound,
      destroy: action.bound,
    });
  }

  private _name = '';
  private _address = '';
  private _paymentMethod: PaymentMethod = 'delivery';
  private _cardNumber = '';
  private _cardExpiry = '';
  private _cardCvv = '';
  private _errors: CheckoutErrors = {
    name: '',
    address: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  };

  get name() {
    return this._name;
  }
  get address() {
    return this._address;
  }
  get paymentMethod() {
    return this._paymentMethod;
  }
  get cardNumber() {
    return this._cardNumber;
  }
  get cardExpiry() {
    return this._cardExpiry;
  }
  get cardCvv() {
    return this._cardCvv;
  }
  get errors() {
    return this._errors;
  }

  get isFilled(): boolean {
    const base = !!this._name.trim() && !!this._address.trim();
    if (this._paymentMethod === 'delivery') return base;
    const raw = this._cardNumber.replace(/\s/g, '');
    return (
      base &&
      raw.length === 16 &&
      /^\d{2}\/\d{2}$/.test(this._cardExpiry) &&
      this._cardCvv.length === 3
    );
  }

  get isValid(): boolean {
    if (!this.isFilled) return false;
    const e = this._errors;
    const base = !e.name && !e.address;
    if (this._paymentMethod === 'delivery') return base;
    return base && !e.cardNumber && !e.cardExpiry && !e.cardCvv;
  }

  private validateName(): string {
    if (!this._name.trim()) return 'Name is required';
    return '';
  }

  private validateAddress(): string {
    if (!this._address.trim()) return 'Address is required';
    return '';
  }

  private validateCardNumber(): string {
    if (this._paymentMethod !== 'card') return '';
    const raw = this._cardNumber.replace(/\s/g, '');
    if (!raw) return 'Card number is required';
    if (raw.length < 16) return 'Card number must be 16 digits';
    return '';
  }

  private validateCardExpiry(): string {
    if (this._paymentMethod !== 'card') return '';
    if (!this._cardExpiry) return 'Expiry date is required';
    if (!/^\d{2}\/\d{2}$/.test(this._cardExpiry)) return 'Use MM/YY format';

    const month = parseInt(this._cardExpiry.slice(0, 2), 10);
    const year = parseInt(this._cardExpiry.slice(3, 5), 10) + 2000;

    if (month < 1 || month > 12) return 'Invalid month';

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return 'Card has expired';
    }

    return '';
  }

  private validateCardCvv(): string {
    if (this._paymentMethod !== 'card') return '';
    if (!this._cardCvv) return 'CVV is required';
    if (!/^\d{3}$/.test(this._cardCvv)) return 'CVV must be 3 digits';
    return '';
  }

  setName(value: string): void {
    this._name = value;
    this._errors = { ...this._errors, name: this.validateName() };
  }

  setAddress(value: string): void {
    this._address = value;
    this._errors = { ...this._errors, address: this.validateAddress() };
  }

  setPaymentMethod(value: PaymentMethod): void {
    this._paymentMethod = value;
    if (value === 'delivery') {
      this._errors = {
        ...this._errors,
        cardNumber: '',
        cardExpiry: '',
        cardCvv: '',
      };
    }
  }

  setCardNumber(value: string): void {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    this._cardNumber = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    this._errors = { ...this._errors, cardNumber: this.validateCardNumber() };
  }

  setCardExpiry(value: string): void {
    let digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) {
      digits = digits.slice(0, 2) + '/' + digits.slice(2);
    }
    this._cardExpiry = digits;
    this._errors = { ...this._errors, cardExpiry: this.validateCardExpiry() };
  }

  setCardCvv(value: string): void {
    this._cardCvv = value.replace(/\D/g, '').slice(0, 3);
    this._errors = { ...this._errors, cardCvv: this.validateCardCvv() };
  }

  validateAll(): boolean {
    const errors: CheckoutErrors = {
      name: this.validateName(),
      address: this.validateAddress(),
      cardNumber: this.validateCardNumber(),
      cardExpiry: this.validateCardExpiry(),
      cardCvv: this.validateCardCvv(),
    };
    this._errors = errors;

    const base = !errors.name && !errors.address;
    if (this._paymentMethod === 'delivery') return base;
    return base && !errors.cardNumber && !errors.cardExpiry && !errors.cardCvv;
  }

  destroy(): void {
    this._name = '';
    this._address = '';
    this._paymentMethod = 'delivery';
    this._cardNumber = '';
    this._cardExpiry = '';
    this._cardCvv = '';
    this._errors = {
      name: '',
      address: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvv: '',
    };
  }
}
