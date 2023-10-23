import { axiosConfig } from '@/api/axiosConfig';
import { UserData } from '@/types/user';

type CreateUserData = {
  s_name: string;
  s_email: string;
  s_password: string;
};

export const UserService = {
  create: async (data: CreateUserData) => {
    const response = await axiosConfig.post<UserData>('/user', {
      ...data,
      s_app_origin: 'TH' /* therapist*/,
    });

    return response?.data;
  },
};
