import { create } from 'zustand';

import { Therapy } from '@/types/therapy';
import { ViaCepData } from '@/types/viaCep';

type Address = Omit<ViaCepData, 'ddd'> & { numero: string };
type TypeOfService = {
  inPerson: boolean;
  remote: boolean;
};

type TherapyStore = {
  selectedTherapy: Therapy | null;
  address: Address | null;
  typeOfService: TypeOfService;
  setSelectedTherapy: (therapies: Therapy) => void;
  setAddress: (address: Address | null) => void;
  setTypeOfService: (service: TypeOfService) => void;
};

export const useTherapyStore = create<TherapyStore>((set) => ({
  selectedTherapy: null,
  address: null,
  typeOfService: {
    inPerson: false,
    remote: false,
  },
  setSelectedTherapy: (therapies) => set({ selectedTherapy: therapies }),
  setAddress: (address) => set({ address }),
  setTypeOfService: (service) => set({ typeOfService: service }),
}));
