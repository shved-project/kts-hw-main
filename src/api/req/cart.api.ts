import { api } from '../config/config.api';
import type { ProductType } from './products.api';

export type CartItemType = {
  product: ProductType;
  quantity: number;
};

const getAuthHeader = () => {
  const jwt = localStorage.getItem('jwt');
  return jwt ? { Authorization: `Bearer ${jwt}` } : {};
};

export const getCart = async (): Promise<CartItemType[]> => {
  const { data } = await api.get('/cart', {
    headers: getAuthHeader(),
  });
  return data;
};

export const addToCart = async (
  product: number,
  quantity: number = 1
): Promise<CartItemType[]> => {
  const { data } = await api.post(
    '/cart/add',
    { product, quantity },
    { headers: getAuthHeader() }
  );
  return data;
};

export const removeFromCart = async (
  product: number,
  quantity: number = 1
): Promise<CartItemType[]> => {
  const { data } = await api.post(
    '/cart/remove',
    { product, quantity },
    { headers: getAuthHeader() }
  );
  return data;
};
