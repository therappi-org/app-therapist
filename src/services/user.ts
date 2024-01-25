import { axiosConfig } from '@/api/axiosConfig';
import { UpdateUserData, User } from '@/types/user';

type CreateUserData = {
  s_name: string;
  s_email: string;
  s_password: string;
};

const baseUrl = '/user';

export const UserService = {
  create: async (data: CreateUserData) => {
    const response = await axiosConfig.post<User>(baseUrl, {
      ...data,
      s_app_origin: 'TH' /* therapist*/,
    });

    return response?.data;
  },

  forgotPassword: async ({ s_email }: Pick<CreateUserData, 's_email'>) => {
    const response = await axiosConfig.post(`${baseUrl}/forgotpassword`, {
      s_email,
    });

    return response?.data;
  },

  update: async (data: UpdateUserData) => {
    if (!data?.userId) throw new Error('User id is required');

    console.log(data);

    const response = await axiosConfig.patch<User>(`${baseUrl}/update/${data.userId}`, {
      s_birthdate: data.s_birthdate,
      s_cellphone: data.s_cellphone,
    });

    return response?.data;
  },
};
