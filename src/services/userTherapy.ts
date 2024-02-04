import { axiosConfig } from '@/api/axiosConfig';
import { NotAttendedTherapy } from '@/types/therapy';

export const UserTherapyService = {
  findNotAttendedTherapy: async (userId: number | undefined) => {
    const response = await axiosConfig.get<NotAttendedTherapy[]>(
      `/usertherapy/notattended/${userId}`
    );

    return response?.data;
  },
};
