import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { UserService } from '@/services/user';
import { QueryArgs } from '@/types/query';
import { User } from '@/types/user';

type WarningQueriesArgs = QueryArgs & {
  userId: number | undefined;
};

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

  UpdateAvatar: ({ onError, onSuccess }: QueryArgs<User> = {}) => {
    return useMutation({
      mutationFn: UserService.updateAvatar,
      onSuccess: (data) => {
        onSuccess?.(data);
      },
      onError: (error: AxiosError) => {
        onError?.(error);
      },
    });
  },

  Warnings: ({ onError, onSuccess, userId }: WarningQueriesArgs) => {
    return useQuery({
      queryKey: ['get-user-warnings', userId],
      queryFn: () => UserService.warnings({ userId }),
      enabled: !!userId,
      onSuccess: (data) => {
        onSuccess?.(data);
      },
      onError: (error: AxiosError) => {
        onError?.(error);
      },
    });
  },
};
