'use client';

import Skeleton from 'react-loading-skeleton';
import Container from '@/components/Container';
import styles from './ProductDetail.module.scss';
import swiperStyles from './components/SwiperImages/SwiperImages.module.scss';
import infoStyles from './components/ProductInfo/ProductInfo.module.scss';
import buttonBackStyles from '@/components/ButtonBack/ButtonBack.module.scss';

const ProductDetailSkeleton = () => {
  return (
    <section className={styles.product}>
      <Container>
        <div className={buttonBackStyles['button-back']}>
          <Skeleton width={24} height={24} />
          <Skeleton width={36} height={20} />
        </div>
        <div className={styles.product__content}>
          <div className={swiperStyles.wrapper}>
            <Skeleton height="100%" borderRadius={0} />
          </div>
          <div className={infoStyles.info}>
            <div className={infoStyles.infoText}>
              <div className={infoStyles.infoTitle}>
                <Skeleton height={48} borderRadius={4} />
              </div>
              <Skeleton count={4} height={20} />
            </div>
            <div className={infoStyles.infoPrice}>
              <Skeleton width={140} height={48} borderRadius={4} />
            </div>
            <div className={infoStyles.infoButtons}>
              <Skeleton width={150} height={52} borderRadius={0} />
              <Skeleton width={160} height={52} borderRadius={0} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProductDetailSkeleton;
