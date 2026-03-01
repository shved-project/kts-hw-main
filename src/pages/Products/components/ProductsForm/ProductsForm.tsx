import { Form } from 'react-router';
import styles from '../../Products.module.scss';
import Input from 'components/Input';
import Button from 'components/Button';
import MultiDropdown from 'components/MultiDropdown';

const ProductsForm = () => {
  const options = [
    { id: 'id', title: 'value' },
    { id: 'id1', title: 'value1' },
  ];

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
      <MultiDropdown
        className={styles['products__query-filter']}
        options={options}
      />
    </Form>
  );
};

export default ProductsForm;
