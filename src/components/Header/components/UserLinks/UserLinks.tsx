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
import Text from '@/components/Text';

type UserLinksProps = {
  className?: string;
};

const UserLinks: React.FC<UserLinksProps> = ({ className }) => {
  const { totalCount } = useCartStore();
  const { user } = useUserStore();

  return (
    <div className={classNames(styles.user, className)}>
      <ToggleTheme />
      {user ? (
        <div className={styles.authLinks}>
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
          <UserLink
            href={routerData.profile.href}
            image={userIcon}
            alt="Profile"
            aria-label="Profile"
          />
        </div>
      ) : (
        <div className={styles.authLinks}>
          <Link href={routerData.login.href}>
            <Text view="p-14" weight="semiBold" tag="span">
              Sign In
            </Text>
          </Link>
          <Link href={routerData.register.href}>
            <Button className={styles.authButton}>
              <Text view="p-14" weight="semiBold" tag="span">
                Sign Up
              </Text>
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default observer(UserLinks);
