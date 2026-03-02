import Input from 'components/Input';
import styles from '../../Products.module.scss';
import Button from 'components/Button';

const ProductsForm = () => {
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.products__form}
      method="get"
    >
      <div className={styles['products__input-wrappper']}>
        <Input
          className={styles.products__input}
          onChange={() => {
            console.log(5);
          }}
        />
        <Button>Find now</Button>
      </div>
    </form>
  );
};

export default ProductsForm;
