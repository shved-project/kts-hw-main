'use client';

import React from 'react';
import routerData from '@/config/routerData';
import { useToastStore, useUserStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import userAvatar from '@/assets/icons/user-avatar.svg';
import styles from './ProfileUserData.module.scss';
import Image from 'next/image';
import Text from '@/components/Text';
import Button from '@/components/Button';

const ProfileUserData = () => {
  const { user, initLoading, logOut } = useUserStore();
  const { show } = useToastStore();

  const router = useRouter();

  React.useEffect(() => {
    if (!initLoading && !user) {
      show('You need to log in to view the user profile page', 'error');
      router.replace(routerData.login.href);
    }
  }, [initLoading, router, show, user]);

  const handleLogout = () => {
    logOut();
    router.push('/');
  };

  if (initLoading) {
    return <div>загрузка...</div>;
  }

  return (
    <div className={styles.profile}>
      <div className={styles.profileDataWrapper}>
        <Image src={userAvatar} alt="avatar" width={150} height={150} />
        <Text view="p-20">{user?.email}</Text>
      </div>
      <Button className={styles.profileExit} onClick={handleLogout}>
        Log out
      </Button>
    </div>
  );
};

export default observer(ProfileUserData);
