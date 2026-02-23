import classNames from 'classnames';
import styles from '../../Product.module.scss';
import { Swiper, SwiperSlide, type SwiperRef } from 'swiper/react';
import { useRef, useState } from 'react';
import buttonArrowLeft from 'assets/icons/button-arrow-left.svg';
import buttonArrowRight from 'assets/icons/button-arrow-right.svg';
import { type ProductType } from 'api/products.api';

type SwiperImagesProps = {
  images: ProductType['images'];
};

const SwiperImages = ({ images }: SwiperImagesProps) => {
  const [isBeginningSlide, setIsBeginningSlide] = useState(true);
  const [isEndSlide, setIsEndSlide] = useState(false);

  const swiperRef = useRef<SwiperRef | null>(null);

  const handleSlideChange = () => {
    if (swiperRef.current) {
      setIsBeginningSlide(swiperRef.current.swiper.isBeginning);
      setIsEndSlide(swiperRef.current.swiper.isEnd);
    }
  };

  return (
    <div className={styles.product__swiper}>
      <button
        type="button"
        onClick={() => swiperRef.current?.swiper.slidePrev()}
        className={classNames(
          styles['product__swiper-button'],
          styles['product__swiper-button-prev'],
          {
            [styles['product__swiper-button-disabled']]: isBeginningSlide,
          }
        )}
        aria-label="prev slide"
      >
        <img src={buttonArrowLeft} alt="prev slide" />
      </button>
      <Swiper ref={swiperRef} onSlideChange={handleSlideChange}>
        {images.map((image) => (
          <SwiperSlide>
            <img
              className={styles['product__swiper-image']}
              src={image.url}
              alt="product image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        type="button"
        onClick={() => swiperRef.current?.swiper.slideNext()}
        className={classNames(
          styles['product__swiper-button'],
          styles['product__swiper-button-next'],
          {
            [styles['product__swiper-button-disabled']]: isEndSlide,
          }
        )}
        aria-label="next slide"
      >
        <img src={buttonArrowRight} alt="next slide" />
      </button>
    </div>
  );
};

export default SwiperImages;
