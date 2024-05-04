import { axiosConfig } from '@/api/axiosConfig';
import { UpdateUserData, User, WarningData } from '@/types/user';

type CreateUserData = {
  s_name: string;
  s_email: string;
  s_password: string;
};

type UpdateAvatarData = {
  userId?: number;
  formData: FormData;
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

  update: async ({ userId, ...data }: UpdateUserData) => {
    const response = await axiosConfig.patch<User>(`${baseUrl}/update/${userId}`, {
      ...data,
    });

    return response?.data;
  },

  updateAvatar: async ({ userId, formData }: UpdateAvatarData) => {
    const response = await axiosConfig.patch<User>(`${baseUrl}/avatar/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response?.data;
  },

  warnings: async ({ userId }: { userId: number | undefined }) => {
    const response = await axiosConfig.get<WarningData[]>(`${baseUrl}/${userId}/warnings`);

    return response?.data;
  },
};
