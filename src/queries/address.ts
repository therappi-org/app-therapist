import { useQuery } from '@tanstack/react-query';

import { AddressService } from '@/services/address';

type AddressQueriesArgs = {
  userId: number | undefined;
};

export const AddressQueries = {
  GetRegisteredAddress: ({ userId }: AddressQueriesArgs) => {
    return useQuery({
      queryKey: ['get-registered-address', userId],
      queryFn: () => AddressService.getRegisteredAddress(userId),
      enabled: !!userId,
    });
  },
};
