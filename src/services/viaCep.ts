import { axiosConfig } from '@/api/axiosConfig';
import { ViaCepData } from '@/types/viaCep';

export const ViaCepService = {
  getCepData: async (cep: string) => {
    const response = await axiosConfig.get<ViaCepData>(`https://viacep.com.br/ws/${cep}/json`);

    return response?.data;
  },
};
