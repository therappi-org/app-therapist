import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { UserService } from '@/services/user';
import { QueryArgs } from '@/types/query';
import { User } from '@/types/user';

type WarningQueriesArgs = QueryArgs & {
  userId: number | undefined;
};

type UpdateWorkingDaysArgs = QueryArgs & {
  idUser: number;
};

type GetWorkingDaysArgs = QueryArgs & {
  userId: number;
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

  Warnings: ({ userId }: WarningQueriesArgs) => {
    return useQuery({
      queryKey: ['get-user-warnings', userId],
      queryFn: () => UserService.warnings({ userId }),
      enabled: !!userId,
    });
  },

  UpdateWorkingDays: ({ onError, onSuccess }: UpdateWorkingDaysArgs) => {
    return useMutation({
      mutationFn: UserService.updateWorkingDays,
      onSuccess: (data) => {
        onSuccess?.(data);
      },
      onError: (error: AxiosError) => {
        onError?.(error);
      },
    });
  },

  GetWorkingDays: ({ userId }: GetWorkingDaysArgs) => {
    return useQuery({
      queryKey: ['get-user-working-days', userId],
      queryFn: () => UserService.getWorkingDays(userId),
      enabled: !!userId,
    });
  },
};
