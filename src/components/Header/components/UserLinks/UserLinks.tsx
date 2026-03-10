'use client';

import UserLink from '../UserLink';
import styles from '../../Header.module.scss';
import routerData from '@/config/routerData';
import bagIcon from '@/assets/icons/bag.svg';
import userIcon from '@/assets/icons/user.svg';
import classNames from 'classnames';
import { useCartStore, useThemeStore } from '@/store/root';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import Image from 'next/image';

type UserLinksProps = {
  className?: string;
};

const UserLinks: React.FC<UserLinksProps> = ({ className }) => {
  const { totalCount } = useCartStore();
  const { theme, toggle } = useThemeStore();

  return (
    <div className={classNames(styles.header__user, className)}>
      <button onClick={toggle} aria-label="Toggle theme">
        {theme === 'light' ? 'Dark' : 'Light'}
      </button>
      <Link
        href={routerData.cart.href}
        className={styles['header__cart-link']}
        aria-label="Cart"
      >
        <Image src={bagIcon} alt="Cart" />
        {totalCount > 0 && (
          <span className={styles['header__cart-badge']}>{totalCount}</span>
        )}
      </Link>
      <UserLink
        href={routerData.profile.href}
        image={userIcon}
        alt="Profile"
        aria-label="Profile"
      />
    </div>
  );
};

export default observer(UserLinks);
