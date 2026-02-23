type Route<Params extends unknown[] = []> = {
  href: string;
  create: (...params: Params) => string;
};

const routerData = {
  products: {
    href: '/products',
    create: () => '/products',
  },
  product: {
    href: '/products/:id',
    create: (id: string) => `/products/${id}`,
  },
  categories: {
    href: '/categories',
    create: () => '/categories',
  },
  about: {
    href: '/about',
    create: () => '/about',
  },
  profile: {
    href: '/profile',
    create: () => '/profile',
  },
  cart: {
    href: '/cart',
    create: () => '/cart',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} satisfies Record<string, Route<any[]>>;

export default routerData;
