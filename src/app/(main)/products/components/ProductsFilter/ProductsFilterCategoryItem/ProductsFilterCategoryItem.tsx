import classNames from 'classnames';
import styles from '../../../Products.module.scss';

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
      className={classNames(styles['products__category-dropdown-option'], {
        [styles['products__category-dropdown-option--selected']]:
          isCurrentCategory,
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
