import type { PaginationType } from './pagination.type';

export type ResponseType<T> = {
  data: T;
  meta: {
    pagination: PaginationType;
  };
};
