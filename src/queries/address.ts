import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { AddressService } from '@/services/address';
import { Address } from '@/types/address';
import { QueryArgs } from '@/types/query';

type AddressQueriesArgs = QueryArgs<Address[]> & {
  userId: number;
};

export const AddressQueries = {
  GetRegisteredAddress: ({ userId, onError, onSuccess }: AddressQueriesArgs) => {
    return useQuery({
      queryKey: ['get-registered-address', userId],
      queryFn: () => AddressService.getRegisteredAddress(userId),
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
