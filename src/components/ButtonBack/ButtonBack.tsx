'use client';

import Text from '@/components/Text';
import styles from './ButtonBack.module.scss';
import arrowLeftIcon from '@/assets/icons/arrow-left.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ButtonBack = () => {
  const navigate = useRouter();

  const handleClick = () => {
    navigate.back();
  };

  return (
    <button
      className={styles['button-back']}
      type="button"
      onClick={handleClick}
    >
      <Image
        className={styles['button-back__icon']}
        src={arrowLeftIcon}
        alt="back"
      />
      <Text view="p-20">Back</Text>
    </button>
  );
};

export default ButtonBack;
