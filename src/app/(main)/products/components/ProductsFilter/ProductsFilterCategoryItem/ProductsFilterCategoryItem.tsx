import classNames from 'classnames';
import styles from './ProductsFilterCategoryItem.module.scss';

type ProductsFilterCategoryItemProps = {
  isCurrentCategory: boolean;
  title: string;
  onClick: () => void;
};

const ProductsFilterCategoryItem: React.FC<ProductsFilterCategoryItemProps> = ({
  isCurrentCategory,
  title,
  onClick,
}) => {
  return (
    <div
      className={classNames(styles.option, {
        [styles['option--selected']]: isCurrentCategory,
      })}
      onClick={onClick}
      role="option"
      aria-selected={isCurrentCategory}
    >
      {title}
    </div>
  );
};

export default ProductsFilterCategoryItem;
