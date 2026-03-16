'use client';

import UserLink from '../UserLink';
import ToggleTheme from '../ToggleTheme';
import Button from '@/components/Button';
import styles from './UserLinks.module.scss';
import routerData from '@/config/routerData';
import bagIcon from '@/assets/icons/bag.svg';
import userIcon from '@/assets/icons/user.svg';
import classNames from 'classnames';
import { useCartStore, useUserStore } from '@/store/root';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import Image from 'next/image';

type UserLinksProps = {
  className?: string;
};

const UserLinks: React.FC<UserLinksProps> = ({ className }) => {
  const { totalCount } = useCartStore();
  const { user } = useUserStore();

  return (
    <div className={classNames(styles.user, className)}>
      <ToggleTheme />
      <Link
        href={routerData.cart.href}
        className={styles.cartLink}
        aria-label="Cart"
      >
        <Image src={bagIcon} alt="Cart" />
        {totalCount > 0 && (
          <span className={styles.cartBadge}>{totalCount}</span>
        )}
      </Link>
      {user ? (
        <UserLink
          href={routerData.profile.href}
          image={userIcon}
          alt="Profile"
          aria-label="Profile"
        />
      ) : (
        <div className={styles.authButtons}>
          <Link href={routerData.login.href}>
            <Button
              className={`${styles.authButtonLogin} ${styles.authButton}`}
            >
              Sign In
            </Button>
          </Link>
          <Link href={routerData.register.href}>
            <Button className={styles.authButton}>Sign Up</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default observer(UserLinks);
