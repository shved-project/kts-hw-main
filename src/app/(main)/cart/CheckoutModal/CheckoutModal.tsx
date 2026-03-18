'use client';

import React from 'react';
import { observer } from 'mobx-react-lite';
import { Modal } from '@/components/Modal';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Text from '@/components/Text';
import { useLocalStore } from '@/store/hooks';
import { CheckoutStore, type PaymentMethod } from '@/store/locals/checkout/CheckoutStore';
import classNames from 'classnames';
import styles from './CheckoutModal.module.scss';

type CheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const PAYMENT_OPTIONS: { value: PaymentMethod; label: string }[] = [
  { value: 'delivery', label: 'On delivery' },
  { value: 'card', label: 'Pay now' },
];

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const store = useLocalStore(() => new CheckoutStore());
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!store.validateAll()) return;

      setIsSubmitting(true);

      await new Promise((resolve) => setTimeout(resolve, 800));

      setIsSubmitting(false);
      store.destroy();
      onSuccess();
    },
    [store, onSuccess]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Checkout">
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <Text view="p-14" tag="span" className={styles.label}>
            Name
          </Text>
          <Input
            value={store.name}
            onChange={store.setName}
            placeholder="Your name"
            error={store.errors.name}
          />
        </div>
        <div className={styles.field}>
          <Text view="p-14" tag="span" className={styles.label}>
            Address
          </Text>
          <Input
            value={store.address}
            onChange={store.setAddress}
            placeholder="Delivery address"
            error={store.errors.address}
          />
        </div>
        <div className={styles.field}>
          <Text view="p-14" tag="span" className={styles.label}>
            Payment method
          </Text>
          <div className={styles.paymentToggle}>
            {PAYMENT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={classNames(
                  styles.paymentOption,
                  store.paymentMethod === opt.value &&
                    styles.paymentOption_active
                )}
                onClick={() => store.setPaymentMethod(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div
          className={classNames(
            styles.cardFields,
            store.paymentMethod === 'card' && styles.cardFields_visible
          )}
        >
          <div className={classNames(styles.field, styles.cardNumberField)}>
            <Text view="p-14" tag="span" className={styles.label}>
              Card number
            </Text>
            <Input
              value={store.cardNumber}
              onChange={store.setCardNumber}
              placeholder="0000 0000 0000 0000"
              error={store.errors.cardNumber}
              inputMode="numeric"
            />
          </div>
          <div className={styles.field}>
            <Text view="p-14" tag="span" className={styles.label}>
              Expiry date
            </Text>
            <Input
              value={store.cardExpiry}
              onChange={store.setCardExpiry}
              placeholder="MM/YY"
              error={store.errors.cardExpiry}
              inputMode="numeric"
            />
          </div>
          <div className={styles.field}>
            <Text view="p-14" tag="span" className={styles.label}>
              CVV
            </Text>
            <Input
              value={store.cardCvv}
              onChange={store.setCardCvv}
              placeholder="000"
              error={store.errors.cardCvv}
              inputMode="numeric"
            />
          </div>
        </div>
        <Button
          type="submit"
          loading={isSubmitting}
          disabled={!store.isValid || isSubmitting}
          className={styles.submitBtn}
        >
          Place Order
        </Button>
      </form>
    </Modal>
  );
};

export default observer(CheckoutModal);
