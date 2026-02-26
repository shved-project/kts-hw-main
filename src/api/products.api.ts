import type { ResponseType } from './types/response.type';
import { api } from './config.api';
import qs from 'qs';

export type ProductType = {
  description: string;
  discountPercent: number;
  id: number;
  documentId: string;
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

const PAGE_SIZE = 12;

export const getProducts = async (
  page: number
): Promise<ResponseType<ProductType[]>> => {
  const query = qs.stringify(
    {
      populate: ['images', 'productCategory'],
      pagination: { page: page, pageSize: PAGE_SIZE },
    },
    { encodeValuesOnly: true }
  );

  const { data } = await api.get(`/products?${query}`);

  return data;
};

export const getProduct = async (id: string): Promise<ProductType> => {
  const query = qs.stringify(
    { populate: ['images', 'productCategory'] },
    { encodeValuesOnly: true }
  );

  const { data } = await api.get(`/products/${id}?${query}`);

  return data.data;
};
