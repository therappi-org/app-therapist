import { useMutation } from '@tanstack/react-query';

import { AuthService } from '@/services/auth';

export const AuthQuery = {
  Session: (onSuccess?: any, onError?: any) => {
    return useMutation({
      mutationFn: AuthService.session,
      onSuccess: (data) => {
        onSuccess?.(data);
      },
      onError: (error) => {
        onError?.(error);
      },
    });
  },
};
