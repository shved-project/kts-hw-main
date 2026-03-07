import Text from '@/components/Text';
import errorIcon from '@/assets/icons/error.svg';
import styles from './ErrorApiMessage.module.scss';
import classNames from 'classnames';
import Image from 'next/image';

type ErrorApiMessageProps = {
  error: string;
  className?: string;
};

const ErrorApiMessage = ({ error, className }: ErrorApiMessageProps) => {
  return (
    <div className={classNames(styles.error, className)}>
      <Image src={errorIcon} alt="error" />
      <Text view="p-20" tag="h1" weight="semiBold">
        {error}
      </Text>
    </div>
  );
};

export default ErrorApiMessage;
