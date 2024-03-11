import { axiosConfig } from '@/api/axiosConfig';
import { CreateTherapyData, NotAttendedTherapy } from '@/types/therapy';

export const UserTherapyService = {
  findNotAttendedTherapy: async (userId: number | undefined) => {
    const response = await axiosConfig.get<NotAttendedTherapy[]>(
      `/usertherapy/notattended/${userId}`
    );

    return response?.data;
  },

  createTherapy: async (data: CreateTherapyData) => {
    const response = await axiosConfig.post('/usertherapy/wizard-create', {
      ...data,
    });

    return response?.data;
  },
};
