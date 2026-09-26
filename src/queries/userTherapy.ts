import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { UserTherapyService } from '@/services/userTherapy';
import { QueryArgs } from '@/types/query';

type NotAttendedTherapyQueryArgs = { userId: number | undefined };

export const UserTherapyQuery = {
  FindNotAttendedTherapy: ({ userId }: NotAttendedTherapyQueryArgs) => {
    return useQuery({
      queryKey: ['get-not-attended-therapy', userId],
      queryFn: () => UserTherapyService.findNotAttendedTherapy(userId),
      enabled: !!userId,
    });
  },

  CreateTherapy: ({ onError, onSuccess }: QueryArgs = {}) => {
    return useMutation({
      mutationFn: UserTherapyService.createTherapy,
      onSuccess: (data) => {
        onSuccess?.(data);
      },
      onError: (error: AxiosError) => {
        onError?.(error);
      },
    });
  },
};
