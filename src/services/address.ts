import { axiosConfig } from '@/api/axiosConfig';
import { Address } from '@/types/address';

export const AddressService = {
  getRegisteredAddress: async (userId: number) => {
    const response = await axiosConfig.get<Address[]>(`/useraddress/${userId}`);

    return response?.data;
  },
};
