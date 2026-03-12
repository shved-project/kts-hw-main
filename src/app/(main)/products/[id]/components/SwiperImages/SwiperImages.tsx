'use client';

import React from 'react';
import { ProductType } from '@/api/products.api';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import styles from './SwiperImages.module.scss';
import Image from 'next/image';
import classNames from 'classnames';
import buttonArrowLeft from '@/assets/icons/button-arrow-left.svg';
import buttonArrowRight from '@/assets/icons/button-arrow-right.svg';

type SwiperImagesProps = {
  images: ProductType['images'];
};

const SwiperImages = ({ images }: SwiperImagesProps) => {
  const [isBeginningSlide, setIsBeginningSlide] = React.useState(true);
  const [isEndSlide, setIsEndSlide] = React.useState(false);

  const swiperRef = React.useRef<SwiperRef | null>(null);

  const handleSlideChange = () => {
    if (swiperRef.current) {
      setIsBeginningSlide(swiperRef.current.swiper.isBeginning);
      setIsEndSlide(swiperRef.current.swiper.isEnd);
    }
  };

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        onClick={() => swiperRef.current?.swiper.slidePrev()}
        className={classNames(
          styles.button,
          styles.buttonPrev,
          {
            [styles.buttonDisabled]: isBeginningSlide,
          }
        )}
        aria-label="prev slide"
      >
        <Image src={buttonArrowLeft} alt="prev slide" />
      </button>
      <Swiper
        className={styles.swiperEl}
        ref={swiperRef}
        onSlideChange={handleSlideChange}
      >
        {images.map((image) => (
          <SwiperSlide key={image.url}>
            <Image
              className={styles.image}
              src={image.url}
              alt="product image"
              fill
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        type="button"
        onClick={() => swiperRef.current?.swiper.slideNext()}
        className={classNames(
          styles.button,
          styles.buttonNext,
          {
            [styles.buttonDisabled]: isEndSlide,
          }
        )}
        aria-label="next slide"
      >
        <Image src={buttonArrowRight} alt="next slide" />
      </button>
    </div>
  );
};

export default SwiperImages;
