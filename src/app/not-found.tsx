'use client';

import React from 'react';
import Text from '@/components/Text';
import styles from './not-found.module.scss';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();

  const handleClick = React.useCallback(() => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  }, [router]);

  return (
    <div className={styles.not_found}>
      <Text tag="h1" view="title">
        404 NOT FOUND
      </Text>
      <Button onClick={handleClick}>Go back</Button>
    </div>
  );
};

export default NotFound;
