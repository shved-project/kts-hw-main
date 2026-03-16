import { api } from '../config/config.api';

export type RegisterType = {
  jwt: string;
  user: {
    email: string;
    id: number;
  };
};

export type UserType = RegisterType['user'];

export type RegisterParams = {
  email: string;
  password: string;
};

export const register = async (
  userParams: RegisterParams
): Promise<RegisterType> => {
  const { data } = await api.post('/auth/local/register', {
    username: userParams.email,
    email: userParams.email,
    password: userParams.password,
  });

  return data;
};

export const login = async (
  userParams: RegisterParams
): Promise<RegisterType> => {
  const { data } = await api.post('/auth/local', {
    identifier: userParams.email,
    password: userParams.password,
  });

  return data;
};
