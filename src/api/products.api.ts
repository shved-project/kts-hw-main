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

export type ProductCategoryType = {
  id: number;
  documentId: string;
  title: string;
};

const PAGE_SIZE = 12;

export type GetProductsParams = {
  page: number;
  search?: string;
  categoryId?: string | null;
};

export const getProducts = async (
  params: GetProductsParams
): Promise<ResponseType<ProductType[]>> => {
  const filters: Record<string, unknown> = {};

  if (params.search?.trim()) {
    filters.title = { $containsi: params.search.trim() };
  }
  if (params.categoryId != null) {
    filters.productCategory = { id: { $eq: params.categoryId } };
  }

  const query = qs.stringify(
    {
      populate: ['images', 'productCategory'],
      pagination: { page: params.page, pageSize: PAGE_SIZE },
      ...(Object.keys(filters).length > 0 && { filters }),
    },
    { encodeValuesOnly: true }
  );

  const { data } = await api.get(`/products?${query}`);

  return data;
};
// export const getProducts = async (
//   params: GetProductsParams
// ): Promise<ResponseType<ProductType[]>> => {
//   const filters: Record<string, unknown> = {};

//   if (params.search?.trim()) {
//     filters.title = { $containsi: params.search.trim() };
//   }
//   if (params.categoryId != null) {
//     filters.productCategory = { id: { $eq: params.categoryId } };
//   }

//   const query = qs.stringify(
//     {
//       populate: ['images', 'productCategory'],
//       pagination: { page: params.page, pageSize: PAGE_SIZE },
//       ...(Object.keys(filters).length > 0 && { filters }),
//     },
//     { encodeValuesOnly: true }
//   );

//   const { data } = await api.get(`/products?${query}`);

//   return data;
// };

export const getProductCategories = async (): Promise<
  ResponseType<ProductCategoryType[]>
> => {
  const { data } = await api.get('/product-categories');
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
