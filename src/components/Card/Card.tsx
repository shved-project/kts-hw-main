import classNames from 'classnames';
import React from 'react';
import styles from './Card.module.scss';
import Text from '../Text';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  subtitle,
  title,
  actionSlot,
  captionSlot,
  contentSlot,
  onClick,
}) => {
  return (
    <article className={classNames(styles.card, className)} onClick={onClick}>
      <div className={styles['card__image-wrapper']}>
        <img className={styles['card__image']} src={image} alt="image_card" />
      </div>
      <div className={styles['card__content']}>
        <div className={styles['card__content-text']}>
          {captionSlot && (
            <Text color="secondary" view="p-14" weight="medium">
              {captionSlot}
            </Text>
          )}
          <Text tag="h3" maxLines={2} view="p-20" weight="medium">
            {title}
          </Text>
          <Text maxLines={3} view="p-16" weight="normal" color="secondary">
            {subtitle}
          </Text>
        </div>
        <div className={styles['card__content-action']}>
          {contentSlot && contentSlot}
          {actionSlot && actionSlot}
        </div>
      </div>
    </article>
  );
};

export default Card;
