const routerData = {
  products: {
    href: '/products',
    create: () => '/products',
  },
  product: {
    href: '/products/:id',
    create: (id: number) => `/product/${id}`,
  },
};

export default routerData;
