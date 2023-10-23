import Toast from 'react-native-root-toast';

import { axiosConfig } from './axiosConfig';

import colors from '@/theme/colors';

export const InterceptorError = () => {
  const onError = (error: any) => {
    if (error.response) {
      const { data } = error.response;
      const { message } = data;

      Toast.show(message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        shadow: true,
        opacity: 1,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: colors.feedback.error,
      });
    }
  };

  axiosConfig.interceptors.response.use(undefined, (error) => {
    onError(error);

    return Promise.reject(error);
  });

  return null;
};
