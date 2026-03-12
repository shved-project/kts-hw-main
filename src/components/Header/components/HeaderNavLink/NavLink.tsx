'use client';

import type { HeaderNavType } from '@/config/headerNav';
import styles from './NavLink.module.scss';
import Text from '@/components/Text';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

type HeaderNavLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  link: HeaderNavType;
};

const HeaderNavLink: React.FC<HeaderNavLinkProps> = ({ link, ...rest }) => {
  const pathname = usePathname();

  return (
    <li className={styles.navItem}>
      <Link
        href={link.href}
        className={classNames(styles.navLink, {
          [styles['navLink--active']]: pathname === link.href,
        })}
        {...rest}
      >
        <Text className={styles.navLinkText} view="p-18">
          {link.text}
        </Text>
      </Link>
    </li>
  );
};

export default HeaderNavLink;
