import { BASE_URL } from '@/config/api';
import axios from 'axios';

export const api = axios.create({
  baseURL: BASE_URL,
});
