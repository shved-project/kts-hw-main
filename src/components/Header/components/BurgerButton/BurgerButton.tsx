import classNames from 'classnames';
import styles from '../../Header.module.scss';

type BurgerButtonProps = {
  isBurgerActive: boolean;
  onClick: () => void;
};

const BurgerButton: React.FC<BurgerButtonProps> = ({
  isBurgerActive,
  onClick,
}) => {
  return (
    <button
      className={classNames(styles.header__burger, {
        [styles['header__burger--active']]: isBurgerActive,
      })}
      type="button"
      aria-label="burger-menu"
      onClick={onClick}
    >
      <div className={styles['header__burger-item']}></div>
      <div className={styles['header__burger-item']}></div>
      <div className={styles['header__burger-item']}></div>
    </button>
  );
};

export default BurgerButton;
