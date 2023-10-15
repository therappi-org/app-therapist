import { axiosConfig } from '@/api/axiosConfig';
import { SignInFormValues } from '@/app/(auth)/sign-in';
import { UserData } from '@/types/user';

export const AuthService = {
  session: async (data: SignInFormValues) => {
    const response = await axiosConfig.post<UserData>('/sessions', {
      ...data,
      s_app_origin: 'TH' /* therapist*/,
    });

    return response?.data;
  },
};
