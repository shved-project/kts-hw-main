import { api } from '../config/config.api';

export type RegisterType = {
  jwt: string;
  user: {
    username: string;
    email: string;
    id: number;
  };
};

export type UserType = RegisterType['user'];

export type RegisterParams = {
  username: string;
  email: string;
  password: string;
};

export const register = async (
  userParams: RegisterParams
): Promise<RegisterType> => {
  const { data } = await api.post('/auth/local/register', {
    username: userParams.username,
    email: userParams.email,
    password: userParams.password,
  });

  return data;
};
