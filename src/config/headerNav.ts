import routerData from '@/config/routerData';

export type HeaderNavType = {
  href: string;
  text: string;
};

const headerNav: HeaderNavType[] = [
  {
    href: routerData.products.href,
    text: 'Products',
  },
  {
    href: routerData.categories.href,
    text: 'Categories',
  },
  {
    href: routerData.about.href,
    text: 'About us',
  },
];

export default headerNav;
