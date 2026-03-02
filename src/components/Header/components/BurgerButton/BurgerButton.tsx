import React from 'react';
import classNames from 'classnames';
import styles from '../../Header.module.scss';

type BurgerButtonProps = {
  isBurgerActive: boolean;
  setIsBurgerActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const BurgerButton: React.FC<BurgerButtonProps> = ({
  isBurgerActive,
  setIsBurgerActive,
}) => {
  React.useEffect(() => {
    if (isBurgerActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isBurgerActive]);

  const handleBurgerClick = () => {
    setIsBurgerActive((prev) => !prev);
  };

  return (
    <button
      className={classNames(styles.header__burger, {
        [styles['header__burger--active']]: isBurgerActive,
      })}
      type="button"
      aria-label="burger-menu"
      onClick={handleBurgerClick}
    >
      <div className={styles['header__burger-item']}></div>
      <div className={styles['header__burger-item']}></div>
      <div className={styles['header__burger-item']}></div>
    </button>
  );
};

export default BurgerButton;
