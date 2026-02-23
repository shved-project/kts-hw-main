import Text from 'components/Text';
import styles from './ButtonBack.module.scss';
import arrowLeftIcon from 'assets/icons/arrow-left.svg';
import { useNavigate } from 'react-router';

const ButtonBack = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button
      className={styles['button-back']}
      type="button"
      onClick={handleClick}
    >
      <img src={arrowLeftIcon} alt="back" />
      <Text view="p-20">Back</Text>
    </button>
  );
};

export default ButtonBack;
