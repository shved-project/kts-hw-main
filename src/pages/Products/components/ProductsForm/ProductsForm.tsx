import { Form } from 'react-router';
import styles from '../../Products.module.scss';
import Input from 'components/Input';
import Button from 'components/Button';

const ProductsForm = () => {
  return (
    <Form className={styles['products__query']}>
      <div className={styles['products__query-search']}>
        <Input
          className={styles['products__query-search-input']}
          placeholder="Search product"
          name="title"
        />
        <Button type="submit">Find now</Button>
      </div>
    </Form>
  );
};

export default ProductsForm;
