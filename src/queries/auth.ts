import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { AuthService } from '@/services/auth';
import { QueryArgs } from '@/types/query';
import { UserData } from '@/types/user';

export const AuthQuery = {
  Session: ({ onError, onSuccess }: QueryArgs<UserData> = {}) => {
    return useMutation({
      mutationFn: AuthService.session,
      onSuccess: (data) => {
        onSuccess?.(data);
      },
      onError: (error: AxiosError) => {
        onError?.(error);
      },
    });
  },
};
