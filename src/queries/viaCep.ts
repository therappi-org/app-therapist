import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ViaCepService } from '@/services/viaCep';
import { QueryArgs } from '@/types/query';
import { ViaCepData } from '@/types/viaCep';

type ViaCepError = {
  erro: boolean;
};

type ViaCepQueriesArgs = QueryArgs<ViaCepData | ViaCepError> & {
  cep: string;
};

export const ViaCepQueries = {
  GetCepData: ({ cep, onError, onSuccess }: ViaCepQueriesArgs) => {
    return useQuery({
      queryKey: ['get-via-cep-data', cep],
      queryFn: () => ViaCepService.getCepData(cep),
      enabled: !!cep && cep.length === 8,
      onSuccess: (data) => {
        onSuccess?.(data);
      },
      onError: (error: AxiosError) => {
        onError?.(error);
      },
    });
  },
};
