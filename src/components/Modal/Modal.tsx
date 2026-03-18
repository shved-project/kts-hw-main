'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';
import classNames from 'classnames';
import Text from '@/components/Text';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const [mounted, setMounted] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const overlayRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      setMounted(true);
    } else if (mounted) {
      setVisible(false);
      const timer = setTimeout(() => setMounted(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen, mounted]);

  React.useEffect(() => {
    if (mounted && isOpen) {
      // Force reflow before adding visible class to trigger CSS transition
      overlayRef.current?.getBoundingClientRect();
      setVisible(true);
    }
  }, [mounted, isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = React.useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  if (!mounted) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className={classNames(styles.overlay, visible && styles.overlay_visible)}
      onClick={handleOverlayClick}
    >
      <div className={styles.modal} role="dialog" aria-modal="true">
        <div className={styles.header}>
          {title && (
            <Text view="title-h2" tag="h2" weight="bold">
              {title}
            </Text>
          )}
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
