import type { HeaderNavType } from 'config/headerNav';
import { NavLink } from 'react-router';
import styles from '../../Header.module.scss';
import Text from 'components/Text';

type HeaderNavLinkProps = {
  link: HeaderNavType;
};

const HeaderNavLink: React.FC<HeaderNavLinkProps> = ({ link }) => {
  return (
    <li className={styles['header__nav-item']}>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? `${styles['header__nav-link--active']} ${styles['header__nav-link']}`
            : styles['header__nav-link']
        }
        to={link.href}
      >
        <Text className={styles['header__nav-link-text']} view="p-18">
          {link.text}
        </Text>
      </NavLink>
    </li>
  );
};

export default HeaderNavLink;
