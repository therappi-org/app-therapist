import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { UserTherapyService } from '@/services/userTherapy';
import { QueryArgs } from '@/types/query';
import { NotAttendedTherapy } from '@/types/therapy';

type NotAttendedTherapyQueryArgs = QueryArgs<NotAttendedTherapy[]> & { userId: number | undefined };

export const UserTherapyQuery = {
  FindNotAttendedTherapy: ({ onError, onSuccess, userId }: NotAttendedTherapyQueryArgs) => {
    return useQuery({
      queryKey: ['get-not-attended-therapy', userId],
      queryFn: () => UserTherapyService.findNotAttendedTherapy(userId),
      enabled: !!userId,
      onSuccess: (data) => {
        onSuccess?.(data);
      },
      onError: (error: AxiosError) => {
        onError?.(error);
      },
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
