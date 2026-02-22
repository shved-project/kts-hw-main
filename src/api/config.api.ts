import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://front-school-strapi.ktsdev.ru/api',
});
