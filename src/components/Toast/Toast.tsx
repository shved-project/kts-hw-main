'use client';

import { AnimatePresence, motion } from 'motion/react';
import { observer } from 'mobx-react-lite';
import Text from '../Text';
import styles from './Toast.module.scss';
import { useToastStore } from '@/store';

const Toast = () => {
  const { isVisible, message, status } = useToastStore();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.toast}
          initial={{ opacity: 0, y: -50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -50, x: '-50%' }}
          transition={{ duration: 0.3 }}
          data-status={status}
        >
          <Text view="p-18">{message}</Text>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default observer(Toast);
