import { useQuery } from '@tanstack/react-query';

import { ViaCepService } from '@/services/viaCep';

type ViaCepQueriesArgs = {
  cep: string;
};

export const ViaCepQueries = {
  GetCepData: ({ cep }: ViaCepQueriesArgs) => {
    return useQuery({
      queryKey: ['get-via-cep-data', cep],
      queryFn: () => ViaCepService.getCepData(cep),
      enabled: !!cep && cep.length === 8,
    });
  },
};
