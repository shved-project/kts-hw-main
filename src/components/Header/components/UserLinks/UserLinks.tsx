import UserLink from '../UserLink';
import styles from '../../Header.module.scss';
import routerData from 'config/routerData';
import bagIcon from 'assets/icons/bag.svg';
import userIcon from 'assets/icons/user.svg';
import classNames from 'classnames';

type UserLinksProps = {
  className?: string;
};

const UserLinks: React.FC<UserLinksProps> = ({ className }) => {
  return (
    <div className={classNames(styles.header__user, className)}>
      <UserLink
        href={routerData.cart.href}
        image={bagIcon}
        alt="Cart"
        aria-label="Cart"
      />
      <UserLink
        href={routerData.profile.href}
        image={userIcon}
        alt="Profile"
        aria-label="Profile"
      />
    </div>
  );
};

export default UserLinks;
