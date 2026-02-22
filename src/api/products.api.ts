import type { ResponseType } from './types/response.type';
import { api } from './config.api';
import qs from 'qs';

export type ProductType = {
  description: string;
  discountPercent: number;
  id: number;
  images: { url: string }[];
  isInStock: boolean;
  price: number;
  productCategory: {
    id: number;
    title: string;
  };
  rating: number;
  title: string;
};

export const getProducts = async (): Promise<ResponseType<ProductType[]>> => {
  const query = qs.stringify(
    { populate: ['images', 'productCategory'] },
    { encodeValuesOnly: true }
  );

  const { data } = await api.get(`/products?${query}`);

  return data;
};
