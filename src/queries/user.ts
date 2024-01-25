import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { UserService } from '@/services/user';
import { QueryArgs } from '@/types/query';
import { User } from '@/types/user';

export const UserQuery = {
  Create: ({ onError, onSuccess }: QueryArgs<User> = {}) => {
    return useMutation({
      mutationFn: UserService.create,
      onSuccess: (data) => {
        onSuccess?.(data);
      },
      onError: (error: AxiosError) => {
        onError?.(error);
      },
    });
  },

  ForgotPassword: ({ onError, onSuccess }: QueryArgs<Omit<User, 'userProfiles'>> = {}) => {
    return useMutation({
      mutationFn: UserService.forgotPassword,
      onSuccess: (data) => {
        onSuccess?.(data);
      },
      onError: (error: AxiosError) => {
        onError?.(error);
      },
    });
  },

  Update: ({ onError, onSuccess }: QueryArgs<User> = {}) => {
    return useMutation({
      mutationFn: UserService.update,
      onSuccess: (data) => {
        onSuccess?.(data);
      },
      onError: (error: AxiosError) => {
        onError?.(error);
      },
    });
  },
};
